// src/routes/PublicRoute.jsx  
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  // If user is logged in, redirect to admin dashboard
  return !currentUser ? children : <Navigate to="/admin" />;
};

export default PublicRoute;