import { Navigate } from 'react-router-dom';

import { getToken, isTokenExpired } from 'utils/auth';

export default function PrivateRoute({ children }) {
  const token = getToken();

  if (!token || isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
