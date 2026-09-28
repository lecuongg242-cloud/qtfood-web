import type { GlobalConfig, GroupField } from "payload";
import { adminOnly, anyone } from "../access";
import { revalidateWholeSite } from "../hooks/revalidate";

const link = (name: string, label: string): GroupField => ({
  name,
  type: "group",
  label,
  fields: [
    {
      type: "row",
      fields: [
        { name: "label", type: "text", label: "Tên hiển thị", admin: { width: "50%" } },
        { name: "url", type: "text", label: "Đường dẫn", admin: { width: "50%" } },
      ],
    },
  ],
});

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Thông tin chung",
  admin: { group: "Hệ thống", description: "Thông tin công ty, hotline, mạng xã hội, menu — dùng trên toàn website." },
  access: { read: anyone, update: adminOnly },
  hooks: { afterChange: [revalidateWholeSite] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Công ty",
          fields: [
            {
              type: "row",
              fields: [
                { name: "legalName", type: "text", label: "Tên pháp lý", required: true, admin: { width: "60%" } },
                { name: "brand", type: "text", label: "Thương hiệu", required: true, admin: { width: "40%" } },
              ],
            },
            { name: "positioning", type: "text", label: "Định vị" },
            { name: "slogan", type: "text", label: "Slogan" },
            { name: "tagline", type: "text", label: "Câu khẩu hiệu ngắn" },
            {
              type: "row",
              fields: [
                { name: "taxCode", type: "text", label: "Mã số thuế", admin: { width: "50%" } },
                { name: "email", type: "email", label: "Email", admin: { width: "50%" } },
              ],
            },
            { name: "address", type: "text", label: "Địa chỉ" },
            {
              name: "geo",
              type: "group",
              label: "Toạ độ bản đồ",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "lat", type: "number", label: "Vĩ độ", admin: { width: "50%" } },
                    { name: "lng", type: "number", label: "Kinh độ", admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Hotline & mạng xã hội",
          fields: [
            {
              name: "hotlines",
              type: "array",
              label: "Hotline",
              labels: { singular: "Hotline", plural: "Hotline" },
              minRows: 1,
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "number", type: "text", label: "Số (không dấu chấm)", required: true, admin: { width: "33%" } },
                    { name: "display", type: "text", label: "Hiển thị", required: true, admin: { width: "33%" } },
                    { name: "contact", type: "text", label: "Người phụ trách", admin: { width: "34%" } },
                  ],
                },
              ],
            },
            link("facebook", "Facebook"),
            link("tiktok", "TikTok"),
            {
              name: "zalo",
              type: "array",
              label: "Zalo",
              labels: { singular: "Zalo", plural: "Zalo" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", label: "Tên hiển thị", admin: { width: "50%" } },
                    { name: "url", type: "text", label: "Đường dẫn", admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Menu",
          fields: [
            {
              name: "nav",
              type: "array",
              label: "Menu chính",
              labels: { singular: "Mục menu", plural: "Mục menu" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", label: "Tên", required: true, admin: { width: "50%" } },
                    { name: "href", type: "text", label: "Đường dẫn", required: true, admin: { width: "50%" } },
                  ],
                },
              ],
            },
            {
              name: "primaryCta",
              type: "group",
              label: "Nút chính trên header",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", label: "Chữ trên nút", admin: { width: "50%" } },
                    { name: "href", type: "text", label: "Đường dẫn", admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
