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
      
      {/* ALTERAÇÃO AQUI: Rota da HomePage agora é pública */}
      <Route path="/" element={<HomePage />} />
      
      <Route 
        path="/restaurant" 
        element={
          <ProtectedRoute>
            <RestaurantPage />
          </ProtectedRoute>
        } 
      />
      {/* Você pode querer mudar este redirecionamento também, 
          ou mantê-lo para rotas que não existem */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
