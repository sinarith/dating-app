import { useMemo } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './RomanticBackground.scss';

function seededItems(count, factory) {
  return Array.from({ length: count }, (_, i) => factory(i));
}

export default function RomanticBackground() {
  const prefersReduced = useReducedMotion();

  const stars = useMemo(
    () =>
      seededItems(prefersReduced ? 20 : 55, (i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      })),
    [prefersReduced]
  );

  return (
    <div className="romantic-background" aria-hidden="true">
      <div className="romantic-background__glow romantic-background__glow--pink" />
      <div className="romantic-background__glow romantic-background__glow--purple" />
      <div className="romantic-background__glow romantic-background__glow--blue" />
      <div className="romantic-background__stars">
        {stars.map((star) => (
          <span
            key={star.id}
            className="romantic-background__star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
