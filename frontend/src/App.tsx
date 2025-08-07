import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import IndiaNews from './pages/News/IndiaNews';
import WorldNews from './pages/News/WorldNews';
import Health from './pages/News/HealthNews';
import Jobs from './pages/News/JobsNews';
import SportsNews from './pages/News/SportsNews'
import TechnologyNews from './pages/News/TechnologyNews'
import IPONews from './pages/News/IPONews';
import NewsDetail from './pages/News/NewsDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/AdminPanel/AdminDashboard';
import UserManagement from './pages/AdminPanel/UserManagement';
import NewsScheduler from './components/AdminPanel/NewsScheduler';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import CookiePolicy from './pages/CookiePolicy';
import NotFound from './pages/NotFound';

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
          <Route path="/ipo-news" element={<IPONews />} />
          // Change from:
          <Route path="/news/:id" element={<NewsDetail />} />
          // To:
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          {/* 404 Catch-all route */}
          <Route path="*" element={<NotFound />} />
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

      </Routes>
  );
};

export default App;
