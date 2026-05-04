export const getToken = () => localStorage.getItem("token");

export const isTokenExpired = () => {
  const expiry = localStorage.getItem("tokenExpiry");

  if (!expiry) return true;

  return new Date().getTime() > expiry;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");

  window.location.href = "/login";
};