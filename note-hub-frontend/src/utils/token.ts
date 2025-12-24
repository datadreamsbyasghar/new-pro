// utils/token.ts
export function saveToken(token: string) {
  localStorage.setItem("access_token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("access_token");
}

export function clearToken() {
  localStorage.removeItem("access_token");
}

// ✅ Example: decode payload if JWT
export function getTokenPayload(): any | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}