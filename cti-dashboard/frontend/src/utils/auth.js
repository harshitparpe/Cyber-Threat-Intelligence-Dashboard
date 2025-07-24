// utils/auth.js

export const getToken = () => localStorage.getItem("token");

export function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub || payload.identity || null; // Flask-JWT may store in `identity` or `sub`
  } catch {
    return null;
  }
}

export const isAnalyst = () => {
  const user = getUserFromToken();
  return user?.role === "analyst";
};

export const isAuthenticated = () => {
  return !!getToken();
};
