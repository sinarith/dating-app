import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Calendar, Mail, Camera, Heart, HelpCircle, Sparkles, Menu, X } from 'lucide-react';
import './Navigation.scss';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'date', label: 'Our Date', icon: Calendar },
  { id: 'love-letter', label: 'Love Letter', icon: Mail },
  { id: 'memories', label: 'Memories', icon: Camera },
  { id: 'love-meter', label: 'Love Meter', icon: Heart },
  { id: 'quiz', label: 'Quiz', icon: HelpCircle },
  { id: 'surprise', label: 'Surprise', icon: Sparkles },
];

export default function Navigation({ current, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="navigation__hamburger"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navigation__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="navigation__drawer glass-card"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`navigation__item ${current === item.id ? 'is-active' : ''}`}
                  onClick={() => handleNavigate(item.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <Icon size={20} className="neon-icon" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      <nav className="navigation__bar" aria-label="Quick navigation">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className={`navigation__bar-item ${current === item.id ? 'is-active' : ''}`}
              onClick={() => handleNavigate(item.id)}
              aria-label={item.label}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </nav>
    </>
  );
}