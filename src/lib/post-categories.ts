/** Chuyên mục tin tức — dùng chung cho admin (Payload) và website. */
export const POST_CATEGORIES = [
  { value: "tin-tuc", label: "Tin tức" },
  { value: "khai-truong", label: "Khai trương" },
  { value: "hoat-dong", label: "Hoạt động" },
] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number]["value"];

export const postCategoryLabel = (value: string) => POST_CATEGORIES.find((c) => c.value === value)?.label ?? value;
