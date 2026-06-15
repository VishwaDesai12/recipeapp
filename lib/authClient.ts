/** Returns true when the chef_session cookie is present (set by login, cleared by logout). */
export function isLoggedInClient(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith("chef_session="));
}
