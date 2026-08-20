import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import coupleConfig from '../config/coupleConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './LoveLetter.scss';

export default function LoveLetter() {
  const [opened, setOpened] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const prefersReduced = useReducedMotion();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!opened) return undefined;

    if (prefersReduced) {
      setDisplayedText(coupleConfig.loveLetter);
      return undefined;
    }

    let index = 0;
    intervalRef.current = window.setInterval(() => {
      index += 1;
      setDisplayedText(coupleConfig.loveLetter.slice(0, index));
      if (index >= coupleConfig.loveLetter.length) {
        window.clearInterval(intervalRef.current);
      }
    }, 22);

    return () => window.clearInterval(intervalRef.current);
  }, [opened, prefersReduced]);

  return (
    <div className="love-letter">
      <h2 className="section-title">A little message for you...</h2>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="envelope"
            type="button"
            className="love-letter__envelope"
            onClick={() => setOpened(true)}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Open the love letter"
          >
            <span className="love-letter__envelope-flap" />
            <span className="love-letter__envelope-heart">
              <Heart size={32} className="neon-icon" color="#ff3366" fill="#ff3366" />
            </span>
            <span className="love-letter__envelope-hint">Tap to open</span>
          </motion.button>
        ) : (
          <motion.div
            key="letter"
            className="glass-card love-letter__paper"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="love-letter__text">{displayedText}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}