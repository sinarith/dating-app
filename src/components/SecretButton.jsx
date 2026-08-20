import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import coupleConfig from '../config/coupleConfig';
import './SecretButton.scss';

export default function SecretButton() {
  const [found, setFound] = useState(false);

  return (
    <>
      <button
        type="button"
        className="secret-button"
        onClick={() => setFound(true)}
        aria-label="A hidden surprise"
        title=""
      />

      <AnimatePresence>
        {found && (
          <motion.div
            className="secret-button__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFound(false)}
          >
            <motion.div
              className="glass-card secret-button__card"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <motion.div
                className="secret-button__heart"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Heart size={48} className="neon-icon" fill="currentColor" />
              </motion.div>
              <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                You found my secret <Heart size={20} fill="currentColor" />
              </h3>
              <p>{coupleConfig.secretMessage}</p>
              <button type="button" className="btn btn-ghost" onClick={() => setFound(false)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}