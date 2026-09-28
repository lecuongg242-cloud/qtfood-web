"use server";

import { after } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { leadSchema, type LeadState } from "./schema";
import { notifyLead } from "./notify";

/** Thời gian điền form tối thiểu — nhanh hơn coi như bot */
const MIN_FILL_MS = 3000;

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const raw = Object.fromEntries(
    [...formData.entries()].filter(([, v]) => typeof v === "string") as [string, string][],
  );

  // Chống spam: ô bẫy ẩn có dữ liệu, hoặc gửi quá nhanh → giả vờ thành công, không lưu
  const startedAt = Number(raw._t || 0);
  if (raw.website || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return { status: "success", name: raw.name };
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return { status: "error", errors, values: raw, message: "Vui lòng kiểm tra lại các ô được đánh dấu." };
  }

  const lead = parsed.data;
  let leadId: number | string | undefined;
  try {
    const payload = await getPayload({ config });
    const doc = await payload.create({
      collection: "leads",
      data: {
        type: lead.type,
        status: "new",
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        message: lead.message,
        sourcePage: lead.sourcePage,
        ...(lead.type === "franchise"
          ? { province: lead.province, franchiseInfo: { hasPremises: lead.hasPremises, budget: lead.budget } }
          : { message: [lead.topic && `[${lead.topic}]`, lead.message].filter(Boolean).join(" ") }),
      },
    });
    leadId = doc.id;
  } catch (err) {
    // Không lưu được DB vẫn gửi thông báo để không mất khách
    console.error("[lead] lưu vào DB lỗi:", err, JSON.stringify(lead));
  }

  // Gửi thông báo sau khi đã trả lời khách
  after(() => notifyLead(lead, leadId));

  return { status: "success", name: lead.name };
}
