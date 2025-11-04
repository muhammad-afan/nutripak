import { cookies } from "next/headers";

export async function isAdmin() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("nutri_admin_session");
  return cookie?.value === "true";
}

export async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}
