import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { DownloadProtection } from './components/DownloadProtection';
import { PageGate } from './components/PageGate';
import { AdminReturnLink } from './components/AdminReturnLink';
import { PreviewGate } from './components/PreviewGate';

// Page imports
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProvincialPage from './pages/ProvincialPage';
import ExecutivesPage from './pages/ExecutivesPage';
import ExecutiveProfilePage from './pages/ExecutiveProfilePage';
import EventsPage from './pages/EventsPage';
import MembershipPage from './pages/MembershipPage';
import DonationsPage from './pages/DonationsPage';
import NewsPage from './pages/NewsPage';
import MediaGalleryPage from './pages/MediaGalleryPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import SpecialProjectsPage from './pages/SpecialProjectsPage';
import AnalyticsPage from './pages/AnalyticsPage';

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <PreviewGate>
      <div className="min-h-screen flex flex-col bg-white">
        <DownloadProtection />
        {!isAdmin && <Navigation />}
        {!isAdmin && <AdminReturnLink />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<PageGate pageId="home"><HomePage /></PageGate>} />
            <Route path="/about" element={<PageGate pageId="about"><AboutPage /></PageGate>} />
            <Route path="/provinces/:province" element={<PageGate pageId="provinces"><ProvincialPage /></PageGate>} />
            <Route path="/executives" element={<PageGate pageId="executives"><ExecutivesPage /></PageGate>} />
            <Route path="/executives/:id" element={<PageGate pageId="executives"><ExecutiveProfilePage /></PageGate>} />
            <Route path="/events" element={<PageGate pageId="events"><EventsPage /></PageGate>} />
            <Route path="/membership" element={<PageGate pageId="membership"><MembershipPage /></PageGate>} />
            <Route path="/donate" element={<PageGate pageId="donate"><DonationsPage /></PageGate>} />
            <Route path="/news" element={<PageGate pageId="news"><NewsPage /></PageGate>} />
            <Route path="/gallery" element={<PageGate pageId="gallery"><MediaGalleryPage /></PageGate>} />
            <Route path="/contact" element={<PageGate pageId="contact"><ContactPage /></PageGate>} />
            <Route path="/projects" element={<PageGate pageId="projects"><SpecialProjectsPage /></PageGate>} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/analytics" element={<PageGate pageId="analytics"><AnalyticsPage /></PageGate>} />
          </Routes>
        </main>
        {!isAdmin && <Footer />}
      </div>
    </PreviewGate>
  );
}
