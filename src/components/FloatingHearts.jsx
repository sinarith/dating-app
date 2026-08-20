import { useMemo } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './FloatingHearts.scss';

const ICONS = [Heart, Sparkles, Star];

export default function FloatingHearts({ count = 14 }) {
  const prefersReduced = useReducedMotion();

  const hearts = useMemo(
    () =>
      Array.from({ length: prefersReduced ? Math.min(4, count) : count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: Math.random() * 8 + 10,
        size: Math.random() * 14 + 14,
        drift: `${Math.random() * 80 - 40}px`,
        Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      })),
    [count, prefersReduced]
  );

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart) => {
        const IconComponent = heart.Icon;
        return (
          <span
            key={heart.id}
            className="floating-hearts__item"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              '--drift': heart.drift,
            }}
          >
            <IconComponent size={heart.size} className="neon-icon" />
          </span>
        );
      })}
    </div>
  );
}