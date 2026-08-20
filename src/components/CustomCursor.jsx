import { useEffect, useRef, useState } from 'react';
import './CustomCursor.scss';

function isTouchDevice() {
  return window.matchMedia('(pointer: coarse)').matches;
}

export default function CustomCursor() {
  const dotRef = useRef(null);
  const [enabled] = useState(() => !isTouchDevice());
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rafId;

    const handleMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      const target = event.target;
      setIsPointer(Boolean(target.closest?.('button, a, input, [role="button"]')));
    };

    const render = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', handleMove);
    rafId = requestAnimationFrame(render);
    document.body.classList.add('has-custom-cursor');

    return () => {
      window.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className={`custom-cursor ${isPointer ? 'custom-cursor--hover' : ''}`}
      aria-hidden="true"
    >
      {'\u2764\ufe0f'}
    </div>
  );
}
