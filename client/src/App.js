import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddNewCard from './components/AddNewCard';
import CardHistory from './components/CardHistory';
import AdminPage from './components/AdminPage';
import Dashboard from './components/Dashboard';
import AdminSignup from './components/AdminSignup'; // Import the AdminSignup component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-signup" element={<ProtectedRoute adminOnly><AdminSignup /></ProtectedRoute>} /> 
        {/* {process.env.NODE_ENV === 'development' && <Route path="/admin-signup" element={<AdminSignup />} />} */}
        <Route path="/add-new-card" element={<ProtectedRoute><AddNewCard /></ProtectedRoute>} />
        <Route path="/card-history" element={<ProtectedRoute><CardHistory /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
