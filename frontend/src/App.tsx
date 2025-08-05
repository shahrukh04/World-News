import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import IndiaNews from './pages/News/IndiaNews';
import WorldNews from './pages/News/WorldNews';
import Health from './pages/News/HealthNews';
import Jobs from './pages/News/JobsNews';
import SportsNews from './pages/News/SportsNews';
import TechnologyNews from './pages/News/TechnologyNews';
import NewsDetail from './pages/News/NewsDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/AdminPanel/AdminDashboard';
import UserManagement from './pages/AdminPanel/UserManagement';
import NewsScheduler from './components/AdminPanel/NewsScheduler';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

const App = () => {
  return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/india-news" element={<IndiaNews />} />
          <Route path="/world-news" element={<WorldNews />} />
          <Route path="/health-news" element={<Health />} />
          <Route path="/jobs-news" element={<Jobs />} />
          <Route path="/sports-news" element={<SportsNews />} />
          <Route path="/technology-news" element={<TechnologyNews />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/scheduler"
          element={
            <ProtectedRoute>
              <NewsScheduler />
            </ProtectedRoute>
          }
        />
        {/* Add 404 page route or redirect later */}
      </Routes>
  );
};

export default App;
