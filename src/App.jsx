import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RomanticBackground from './components/RomanticBackground';
import FloatingHearts from './components/FloatingHearts';
import CustomCursor from './components/CustomCursor';
import SplashScreen from './components/SplashScreen';
import Celebration from './components/Celebration';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';
import SecretButton from './components/SecretButton';
import Home from './pages/Home';
import DatePage from './pages/DatePage';
import LoveLetterPage from './pages/LoveLetterPage';
import MemoriesPage from './pages/MemoriesPage';
import LoveMeterPage from './pages/LoveMeterPage';
import QuizPage from './pages/QuizPage';
import SurprisePage from './pages/SurprisePage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useReducedMotion } from './hooks/useReducedMotion';
import './AppShell.scss';

const SPLASH_DURATION = 2800;

export default function App() {
  const [hasSeenSplash, setHasSeenSplash] = useLocalStorage('jmy-splash-seen', false);
  const [showSplash, setShowSplash] = useState(!hasSeenSplash);
  const [saidYes, setSaidYes] = useLocalStorage('jmy-said-yes', false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [page, setPage] = useState('home');
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!showSplash) return undefined;
    const timer = window.setTimeout(() => {
      setShowSplash(false);
      setHasSeenSplash(true);
    }, SPLASH_DURATION);
    return () => window.clearTimeout(timer);
  }, [showSplash, setHasSeenSplash]);

  const handleYes = () => {
    setSaidYes(true);
    setShowCelebration(true);
  };

  const handleCelebrationDone = () => {
    setShowCelebration(false);
    setPage('date');
  };

  const handleNavigate = (target) => {
    if (target === 'home' && saidYes) {
      setPage('date');
    } else {
      setPage(target);
    }
  };

  const renderPage = () => {
    if (page === 'home' && !saidYes) return <Home onYes={handleYes} />;
    if (page === 'home' && saidYes) return <DatePage />;
    if (page === 'date') return <DatePage />;
    if (page === 'love-letter') return <LoveLetterPage />;
    if (page === 'memories') return <MemoriesPage />;
    if (page === 'love-meter') return <LoveMeterPage />;
    if (page === 'quiz') return <QuizPage />;
    if (page === 'surprise') return <SurprisePage />;
    return <Home onYes={handleYes} />;
  };

  const transitionVariants = prefersReduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.97, filter: 'blur(6px)' },
        animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
        exit: { opacity: 0, scale: 1.02, filter: 'blur(6px)' },
      };

  return (
    <div className="app-shell">
      <RomanticBackground />
      <FloatingHearts />
      <CustomCursor />

      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      {!showSplash && saidYes && (
        <Navigation current={page === 'home' ? 'date' : page} onNavigate={handleNavigate} />
      )}

      <main className="app-shell__main">
        <AnimatePresence mode="wait">
          <motion.div
            key={page === 'home' && saidYes ? 'date' : page}
            variants={transitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: prefersReduced ? 0.2 : 0.45, ease: 'easeOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showCelebration && <Celebration key="celebration" onContinue={handleCelebrationDone} />}
      </AnimatePresence>

      <MusicPlayer />
      <SecretButton />
    </div>
  );
}
