import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  console.log('User:', user); 
  console.log('Admin Only:', adminOnly); 

  if (!user) {
    console.log('Redirecting to login, user not found.');
    alert('You must be logged in to view this page.'); 
    return <Navigate to="/" />;
  }
  const { role } = user.user;

  if (adminOnly && role !== 'admin') {
    console.log('Redirecting to dashboard, user is not admin.');
    alert('You do not have permission to access this page.');
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
