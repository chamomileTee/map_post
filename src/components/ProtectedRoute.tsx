import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../store/slices/authSlice';

const ProtectedRoute = () => {
  const { token, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token && !isAuthenticated) {
      dispatch(clearAuth());
    }
  }, [token, isAuthenticated, dispatch]);

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;