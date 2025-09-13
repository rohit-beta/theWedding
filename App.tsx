import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import WeddingEvents from './components/WeddingEvents';
import GuestBook from './components/GuestBook';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import Admin from './components/Admin';

const AppContent: React.FC = () => {
    const location = useLocation();

    return (
        <div className="bg-brand-cream text-brand-charcoal min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/wedding-events" element={<WeddingEvents />} />
                    <Route path="/guest-book" element={<GuestBook />} />
                    <Route path="/rsvp" element={<RSVP />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

const App: React.FC = () => {
  return (
      <HashRouter>
          <AppContent />
      </HashRouter>
  );
};

export default App;