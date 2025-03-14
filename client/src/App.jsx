// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './ScrollToTop';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DonationPage from './pages/DonationPage';
import MembershipPage from './pages/MembershipPage';
import NotFoundPage from './pages/NotFoundPage';
import EventsPage from './pages/EventsPage';

// New subpages for different sections
import GauPage from './pages/initiatives/GauPage';
import GangaPage from './pages/initiatives/GangaPage';
import GayatriPage from './pages/initiatives/GayatriPage';
import GitaPage from './pages/initiatives/GitaPage';
import GuruPage from './pages/initiatives/GuruPage';
import ElementsPage from './pages/elements/ElementsPage';

import ContactPage from './pages/ContactPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop /> {/* This ensures each new route scrolls to the top */}
        <div className="app">
          <Header />
          <main>
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/donate" element={<DonationPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Authentication Pages */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/membership" element={<MembershipPage />} />

              {/* Initiative Pages */}
              <Route path="/gau" element={<GauPage />} />
              <Route path="/ganga" element={<GangaPage />} />
              <Route path="/gayatri" element={<GayatriPage />} />
              <Route path="/gita" element={<GitaPage />} />
              <Route path="/guru" element={<GuruPage />} />
              <Route path="/5elements" element={<ElementsPage />} />

              {/* Community Subpages */}
              <Route path="/events" element={<EventsPage />} />

              {/* Fallback for invalid routes */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
