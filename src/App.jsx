import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminMessages from './pages/AdminMessages.jsx';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    function handleLocationChange() {
      setPath(window.location.pathname);
    }

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  if (path === '/admin/login') {
    return <AdminLogin />;
  }

  if (path === '/admin/messages') {
    return <AdminMessages />;
  }

  return (
    <div className="min-h-screen bg-ink text-text">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
