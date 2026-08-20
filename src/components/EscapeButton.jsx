import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { noButtonMessages } from '../data/loveMessages';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './EscapeButton.scss';

const PROXIMITY_THRESHOLD = 160;
const MIN_RANGE = 10;
const MAX_RANGE = 90;

function randomInRange() {
  return MIN_RANGE + Math.random() * (MAX_RANGE - MIN_RANGE);
}

function pickSafePosition(cursorX, cursorY, avoidRect) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let best = null;
  let bestDistance = -1;

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const leftPercent = randomInRange();
    const topPercent = randomInRange();
    const x = (leftPercent / 100) * vw;
    const y = (topPercent / 100) * vh;

    const cursorDistance = cursorX == null ? Infinity : Math.hypot(x - cursorX, y - cursorY);
    let avoidDistance = Infinity;
    if (avoidRect) {
      const avoidCenterX = avoidRect.left + avoidRect.width / 2;
      const avoidCenterY = avoidRect.top + avoidRect.height / 2;
      avoidDistance = Math.hypot(x - avoidCenterX, y - avoidCenterY);
    }

    const score = Math.min(cursorDistance, avoidDistance);

    if (cursorDistance > 180 && avoidDistance > 160) {
      return { left: leftPercent, top: topPercent };
    }
    if (score > bestDistance) {
      bestDistance = score;
      best = { left: leftPercent, top: topPercent };
    }
  }

  return best || { left: 50, top: 80 };
}

export default function EscapeButton({ yesButtonRef, onAttempt }) {
  const prefersReduced = useReducedMotion();
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ left: 50, top: 78 });
  const [attempts, setAttempts] = useState(0);
  const dodgingRef = useRef(false);

  const dodge = useCallback(
    (cursorX, cursorY) => {
      if (dodgingRef.current) return;
      dodgingRef.current = true;

      const avoidRect = yesButtonRef?.current?.getBoundingClientRect() ?? null;
      const next = pickSafePosition(cursorX, cursorY, avoidRect);
      setPosition(next);
      setAttempts((count) => count + 1);
      onAttempt?.();

      window.setTimeout(() => {
        dodgingRef.current = false;
      }, 260);
    },
    [onAttempt, yesButtonRef]
  );

  useEffect(() => {
    if (prefersReduced) return undefined;

    const handlePointerMove = (event) => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
      if (distance < PROXIMITY_THRESHOLD) {
        dodge(event.clientX, event.clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [dodge, prefersReduced]);

  const handlePointerDown = (event) => {
    if (event.pointerType === 'touch') {
      event.preventDefault();
      dodge(event.clientX, event.clientY);
    }
  };

  const handleClick = () => {
    dodge(null, null);
  };

  const message = noButtonMessages[Math.min(attempts, noButtonMessages.length - 1)];

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      className="escape-button btn btn-ghost"
      style={prefersReduced ? { position: 'static' } : undefined}
      animate={
        prefersReduced
          ? undefined
          : { left: `${position.left}%`, top: `${position.top}%` }
      }
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      aria-label={`No button, currently says: ${message}. It likes to dodge, try clicking yes instead.`}
    >
      {message}
    </motion.button>
  );
}
