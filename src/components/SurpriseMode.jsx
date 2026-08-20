import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import {
  surpriseMessages,
  surpriseCompliments,
  surpriseQuotes,
  surpriseJokes,
} from '../data/loveMessages';
import { surpriseDateIdeas } from '../data/dateIdeas';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './SurpriseMode.scss';

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateSurprise() {
  const categories = [
    { type: 'message', label: 'A little love', items: surpriseMessages },
    { type: 'compliment', label: 'A compliment', items: surpriseCompliments },
    { type: 'quote', label: 'A romantic quote', items: surpriseQuotes },
    { type: 'joke', label: 'A cute joke', items: surpriseJokes },
    { type: 'date', label: 'A date idea', items: surpriseDateIdeas },
  ];
  const category = pickRandom(categories);
  return { type: category.label, text: pickRandom(category.items) };
}

export default function SurpriseMode() {
  const [surprise, setSurprise] = useState(null);
  const prefersReduced = useReducedMotion();

  const handleSurprise = () => {
    setSurprise(generateSurprise());
  };

  return (
    <div className="surprise-mode">
      <h2 className="section-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles size={24} className="neon-icon" /> Surprise Me
      </h2>
      <p className="section-subtitle">Click for a little something from me to you.</p>

      <motion.button
        type="button"
        className="btn btn-primary surprise-mode__button"
        onClick={handleSurprise}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={prefersReduced ? undefined : { boxShadow: ['0 0 20px rgba(255,93,162,0.3)', '0 0 50px rgba(255,93,162,0.6)', '0 0 20px rgba(255,93,162,0.3)'] }}
        transition={prefersReduced ? undefined : { duration: 2, repeat: Infinity }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
      >
        <Sparkles size={18} /> Surprise Me
      </motion.button>

      <AnimatePresence mode="wait">
        {surprise && (
          <motion.div
            key={surprise.text}
            className="glass-card surprise-mode__card"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <span className="surprise-mode__label">{surprise.type}</span>
            <p className="surprise-mode__text">{surprise.text}</p>
            <button 
              type="button" 
              className="btn btn-ghost" 
              onClick={handleSurprise}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Another one <Sparkles size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}