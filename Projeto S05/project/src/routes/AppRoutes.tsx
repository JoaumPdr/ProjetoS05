// src/routes/AppRoutes.tsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import RestaurantPage from '../pages/RestaurantPage';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/" 
        element={
          // CORRETO: A página inicial está protegida, forçando o login.
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/restaurant" 
        element={
          // CORRETO: A página do restaurante também está protegida.
          <ProtectedRoute>
            <RestaurantPage />
          </ProtectedRoute>
        } 
      />
      {/* Qualquer outra rota redireciona para o login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
