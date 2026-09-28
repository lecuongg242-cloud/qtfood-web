const DAY = 24 * 60 * 60 * 1000;

/** Số ngày từ hôm nay tới `iso` (âm = đã qua) */
export const daysUntil = (iso: string) => Math.ceil((new Date(iso).getTime() - Date.now()) / DAY);

/** Ngày ISO sau `days` ngày kể từ hôm nay */
export const isoInDays = (days: number) => new Date(Date.now() + days * DAY).toISOString();
