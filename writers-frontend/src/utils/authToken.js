const AUTH_TOKEN_KEY = "authToken";

export const authToken = {
  set: (token) => localStorage.setItem(AUTH_TOKEN_KEY, token),
  get: () => localStorage.getItem(AUTH_TOKEN_KEY),
  remove: () => localStorage.removeItem(AUTH_TOKEN_KEY),
  exists: () => !!localStorage.getItem(AUTH_TOKEN_KEY),
};
