const USER_INFO = "userInfo";

export const userInfo = {
  set: (userInfo) => localStorage.setItem(USER_INFO, userInfo),
  get: () => localStorage.getItem(USER_INFO),
  remove: () => localStorage.removeItem(USER_INFO),
  exists: () => !!localStorage.getItem(USER_INFO),
};
