import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Gallery from './pages/Gallery.jsx';
import Home from './pages/Home.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import AdminUploadPage from './pages/AdminUploadPage.jsx';

function LegacyPageRedirect() {
  const [params] = useSearchParams();
  const routes = {
    gallery: '/gallery',
    about: '/about',
    contact: '/contact',
    results: '/results',
    admin: '/admin/upload-result',
  };
  const page = params.get('page');
  return <Navigate to={routes[page] || '/'} replace />;
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    requestAnimationFrame(() =>
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    );
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Header />
      <Routes>
        <Route path="/" element={<LegacyHomeRoute />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery.html" element={<Navigate to="/gallery" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/about.html" element={<Navigate to="/about" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/results.html" element={<Navigate to="/results" replace />} />
        <Route path="/admin/upload-result" element={<AdminUploadPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

function LegacyHomeRoute() {
  const [params] = useSearchParams();
  return params.has('page') ? <LegacyPageRedirect /> : <Home />;
}
