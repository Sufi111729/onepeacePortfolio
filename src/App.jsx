import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminMessages from './pages/AdminMessages.jsx';
import NotFound from './pages/NotFound.jsx';

function PortfolioHome() {
  return (
    <div className="min-h-screen bg-ink text-text">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute>
            <AdminMessages />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
