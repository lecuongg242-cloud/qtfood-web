import "server-only";
import type { LeadInput } from "./schema";
import { siteUrl } from "@/lib/site-url";

const TYPE_LABEL: Record<LeadInput["type"], string> = {
  franchise: "Đăng ký nhượng quyền",
  contact: "Liên hệ",
  order: "Đặt hàng",
};

const PREMISES: Record<string, string> = { yes: "Đã có mặt bằng", no: "Chưa có mặt bằng" };


/** Các dòng thông tin (nhãn, giá trị) — dùng chung cho Telegram & email */
function lines(lead: LeadInput, extra: [string, string][] = []): [string, string][] {
  const rows: [string, string | undefined][] = [
    ["Họ tên", lead.name],
    ["Điện thoại", lead.phone],
    ["Email", lead.email],
  ];
  if (lead.type === "franchise") {
    rows.push(["Tỉnh / thành", lead.province], ["Mặt bằng", lead.hasPremises && PREMISES[lead.hasPremises]], ["Ngân sách", lead.budget]);
  } else if (lead.type === "contact") {
    rows.push(["Chủ đề", lead.topic]);
  } else {
    rows.push(...extra, ["Địa chỉ nhận", lead.address]);
  }
  rows.push(["Nội dung", lead.message], ["Trang gửi", lead.sourcePage]);
  return rows.filter((r): r is [string, string] => Boolean(r[1]));
}

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function sendTelegram(lead: LeadInput, adminUrl?: string, extra: [string, string][] = []) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  const text = [
    `<b>🆕 ${TYPE_LABEL[lead.type]}</b>`,
    ...lines(lead, extra).map(([k, v]) => `<b>${k}:</b> ${escapeHtml(v)}`),
    adminUrl ? `\n<a href="${adminUrl}">Mở trong admin</a>` : "",
  ].join("\n");
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}: ${await res.text()}`);
  return true;
}

async function sendEmail(lead: LeadInput, adminUrl?: string, extra: [string, string][] = []) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO?.split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.LEAD_EMAIL_FROM;
  if (!key || !to?.length || !from) return false;
  const rows = lines(lead, extra);
  const html = `<h2 style="font-family:sans-serif">${TYPE_LABEL[lead.type]}</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#667"><b>${k}</b></td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`)
    .join("")}</table>${adminUrl ? `<p><a href="${adminUrl}">Mở trong admin</a></p>` : ""}`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject: `[QT FOOD] ${TYPE_LABEL[lead.type]} – ${lead.name} – ${lead.phone}`,
      html,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") + (adminUrl ? `\n\n${adminUrl}` : ""),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return true;
}

/** Gửi thông báo lead. Một kênh lỗi không ảnh hưởng kênh kia; không kênh nào gửi được → ghi log đầy đủ. */
export async function notifyLead(lead: LeadInput, leadId?: number | string, extra: [string, string][] = []) {
  const adminUrl = leadId ? `${siteUrl()}/admin/collections/leads/${leadId}` : undefined;
  const results = await Promise.allSettled([sendTelegram(lead, adminUrl, extra), sendEmail(lead, adminUrl, extra)]);
  const sent = results.some((r) => r.status === "fulfilled" && r.value);
  results.forEach((r) => r.status === "rejected" && console.error("[lead] thông báo lỗi:", r.reason));
  if (!sent) console.warn("[lead] chưa gửi được thông báo (thiếu cấu hình hoặc lỗi kênh). Lead:", JSON.stringify({ leadId, ...lead }));
}
