import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, PartyPopper } from 'lucide-react';
import coupleConfig from '../config/coupleConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './Celebration.scss';

const ICONS = [Heart, Sparkles, PartyPopper];

export default function Celebration({ onContinue }) {
  const prefersReduced = useReducedMotion();

  const hearts = useMemo(
    () =>
      Array.from({ length: prefersReduced ? 12 : 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: Math.random() * 3 + 3,
        size: Math.random() * 20 + 16,
        Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      })),
    [prefersReduced]
  );

  useEffect(() => {
    if (prefersReduced) return;

    const colors = ['#ff5da2', '#b06bff', '#6ec3ff', '#ffffff'];
    const duration = 2500;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 }, colors });
  }, [prefersReduced]);

  return (
    <div className="celebration">
      <div className="celebration__hearts" aria-hidden="true">
        {hearts.map((heart) => {
          const IconComponent = heart.Icon;
          return (
            <span
              key={heart.id}
              className="celebration__heart"
              style={{
                left: `${heart.left}%`,
                animationDelay: `${heart.delay}s`,
                animationDuration: `${heart.duration}s`,
              }}
            >
              <IconComponent size={heart.size} className="neon-icon" />
            </span>
          );
        })}
      </div>

      <motion.div
        className="celebration__content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="celebration__big-heart"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Heart size={64} className="neon-icon" fill="currentColor" />
        </motion.div>

        <h1 className="celebration__title gradient-text" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          YAYYYYY! <PartyPopper size={32} />
        </h1>
        <p className="celebration__line">It&rsquo;s a date!</p>
        <p className="celebration__line celebration__line--muted">
          I can&rsquo;t wait to spend time with you, {coupleConfig.girlfriendName}.
        </p>

        <motion.button
          type="button"
          className="btn btn-primary celebration__continue"
          onClick={onContinue}
          whileTap={{ scale: 0.95 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          Let&rsquo;s plan it <Heart size={18} />
        </motion.button>
      </motion.div>
    </div>
  );
}