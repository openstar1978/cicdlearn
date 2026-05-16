import { jwtDecode } from 'jwt-decode'

export const getToken = () => localStorage.getItem('token')

export const isTokenExpired = () => {
  const expiry = localStorage.getItem('tokenExpiry')

  if (!expiry) return true

  return new Date().getTime() > expiry
}

export const getUserPermissions = () => {
  const rawToken = getToken()

  if (!rawToken) return []

  try {
    const token = rawToken.replace(/^"|"$/g, '')
    const decoded = jwtDecode(token)
    const permissions = decoded.permission || []

    return Array.isArray(permissions) ? permissions : [permissions]
  } catch {
    return []
  }
}

export const hasPermission = (permission) => {
  if (!permission) return true

  const requiredPermissions = Array.isArray(permission) ? permission : [permission]
  const normalizedPermissions = getUserPermissions().map((userPermission) =>
    userPermission?.toLowerCase(),
  )

  if (normalizedPermissions.includes('*')) return true

  return requiredPermissions.some((requiredPermission) =>
    normalizedPermissions.includes(requiredPermission.toLowerCase()),
  )
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('tokenExpiry')

  window.location.href = '/login'
}
