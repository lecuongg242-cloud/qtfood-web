import type { Access, FieldAccess } from "payload";

type Role = "admin" | "editor";
type UserWithRole = { role?: Role | null } | null | undefined;

export const isAdmin = (user: UserWithRole) => user?.role === "admin";

/** Ai cũng xem được (dữ liệu hiển thị trên website). */
export const anyone: Access = () => true;

/** Đã đăng nhập admin (Admin hoặc Editor). */
export const loggedIn: Access = ({ req }) => Boolean(req.user);

/** Chỉ Admin. */
export const adminOnly: Access = ({ req }) => isAdmin(req.user as UserWithRole);

export const adminOnlyField: FieldAccess = ({ req }) => isAdmin(req.user as UserWithRole);
