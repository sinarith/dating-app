import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import coupleConfig from '../config/coupleConfig';
import EscapeButton from '../components/EscapeButton';
import './Home.scss';

export default function Home({ onYes }) {
  const yesButtonRef = useRef(null);
  const [attempts, setAttempts] = useState(0);

  return (
    <div className="page home-page">
      <motion.div
        className="glass-card home-page__card"
        initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h1 className="section-title home-page__question">
          {coupleConfig.question} {'\u2764\ufe0f'}
        </h1>
        <p className="section-subtitle">{coupleConfig.questionSubtext}</p>

        <div className="home-page__actions">
          <motion.button
            ref={yesButtonRef}
            type="button"
            className="btn btn-primary home-page__yes"
            onClick={onYes}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
          >
            YES {'\u2764\ufe0f'}
          </motion.button>

          <span className="home-page__no-placeholder" aria-hidden="true">
            NO {'\ud83d\ude4c'}
          </span>
        </div>

        {attempts > 3 && (
          <motion.p
            className="home-page__hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            (It really doesn&rsquo;t want to be clicked.)
          </motion.p>
        )}
      </motion.div>

      <EscapeButton yesButtonRef={yesButtonRef} onAttempt={() => setAttempts((n) => n + 1)} />
    </div>
  );
}
