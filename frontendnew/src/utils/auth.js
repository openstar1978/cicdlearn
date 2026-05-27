export const getToken = () => localStorage.getItem('token');

const decodeJwtPayload = (token) => {
  const payload = token.split('.')[1];
  if (!payload) return {};

  const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(
    window
      .atob(normalized)
      .split('')
      .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(json);
};

export const getDecodedToken = () => {
  const rawToken = getToken();
  if (!rawToken) return null;

  try {
    return decodeJwtPayload(rawToken.replace(/^"|"$/g, ''));
  } catch {
    return null;
  }
};

export const isTokenExpired = () => {
  const expiry = localStorage.getItem('tokenExpiry');
  if (expiry) return Date.now() > Number(expiry);

  const decoded = getDecodedToken();
  if (!decoded?.exp) return true;

  return Date.now() > decoded.exp * 1000;
};

export const getUserPermissions = () => {
  const decoded = getDecodedToken();
  const permissions = decoded?.permission || [];

  return Array.isArray(permissions) ? permissions : [permissions];
};

export const hasPermission = (permission) => {
  if (!permission) return true;

  const requiredPermissions = Array.isArray(permission) ? permission : [permission];
  const normalizedPermissions = getUserPermissions().map((userPermission) => userPermission?.toLowerCase());

  if (normalizedPermissions.includes('*')) return true;

  return requiredPermissions.some((requiredPermission) => normalizedPermissions.includes(requiredPermission.toLowerCase()));
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiry');
  window.location.href = `${import.meta.env.VITE_APP_BASE_NAME || ''}/login`;
};
