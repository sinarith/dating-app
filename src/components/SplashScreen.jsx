import { motion } from 'framer-motion';
import coupleConfig from '../config/coupleConfig';
import './SplashScreen.scss';

export default function SplashScreen() {
  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      role="status"
      aria-label="Loading JustMe&You"
    >
      <motion.div
        className="splash-screen__heart"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.15, 1], opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        >
          {'\u2764\ufe0f'}
        </motion.span>
      </motion.div>

      <motion.h1
        className="splash-screen__title gradient-text"
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
      >
        {coupleConfig.title}
      </motion.h1>

      <motion.p
        className="splash-screen__subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {coupleConfig.splashSubtitle}
      </motion.p>

      <motion.div
        className="splash-screen__loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <span className="splash-screen__dot" />
        <span className="splash-screen__dot" />
        <span className="splash-screen__dot" />
      </motion.div>

      <motion.p
        className="splash-screen__tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        {coupleConfig.splashTagline}
      </motion.p>
    </motion.div>
  );
}
