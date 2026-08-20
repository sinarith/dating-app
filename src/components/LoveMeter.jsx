import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, HeartCrack } from 'lucide-react';
import { loveMeterMessages } from '../data/loveMessages';
import './LoveMeter.scss';

function getMessage(value) {
  return loveMeterMessages.find((entry) => value >= entry.min) ?? loveMeterMessages[loveMeterMessages.length - 1];
}

export default function LoveMeter() {
  const [value, setValue] = useState(100);

  const message = getMessage(value);
  const isHappy = value >= 70;
  const isSad = value < 40;

  return (
    <div className="love-meter">
      <h2 className="section-title">How much do you love me?</h2>

      <motion.div
        className="love-meter__heart"
        animate={{
          scale: isHappy ? [1, 1.15, 1] : 1,
          rotate: isSad ? [0, -8, 8, 0] : 0,
        }}
        transition={{ duration: 1, repeat: isHappy ? Infinity : 0, ease: 'easeInOut' }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        {isSad ? (
          <HeartCrack size={64} className="neon-icon" />
        ) : (
          <Heart size={64} className="neon-icon" fill="currentColor" />
        )}
      </motion.div>

      <div className="love-meter__value gradient-text">{value}%</div>

      <p className="love-meter__message">{message.message}</p>

      <div className="love-meter__slider-wrap">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          className="love-meter__slider"
          aria-label="Love percentage slider"
          style={{ '--slider-percent': `${value}%` }}
        />
        <div className="love-meter__labels">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {value < 50 && (
        <motion.button
          type="button"
          className="btn btn-primary"
          onClick={() => setValue(100)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          Fix it <Heart size={18} fill="currentColor" />
        </motion.button>
      )}
    </div>
  );
}



// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { loveMeterMessages } from '../data/loveMessages';
// import './LoveMeter.scss';

// function getMessage(value) {
//   return loveMeterMessages.find((entry) => value >= entry.min) ?? loveMeterMessages[loveMeterMessages.length - 1];
// }

// export default function LoveMeter() {
//   const [value, setValue] = useState(100);

//   const message = getMessage(value);
//   const isHappy = value >= 70;
//   const isSad = value < 40;

//   return (
//     <div className="love-meter">
//       <h2 className="section-title">How much do you love me?</h2>

//       <motion.div
//         className="love-meter__heart"
//         animate={{
//           scale: isHappy ? [1, 1.15, 1] : 1,
//           rotate: isSad ? [0, -8, 8, 0] : 0,
//         }}
//         transition={{ duration: 1, repeat: isHappy ? Infinity : 0, ease: 'easeInOut' }}
//       >
//         {isSad ? '\ud83d\udc94' : '\u2764\ufe0f'}
//       </motion.div>

//       <div className="love-meter__value gradient-text">{value}%</div>

//       <p className="love-meter__message">{message.message}</p>

//       <div className="love-meter__slider-wrap">
//         <input
//           type="range"
//           min="0"
//           max="100"
//           value={value}
//           onChange={(event) => setValue(Number(event.target.value))}
//           className="love-meter__slider"
//           aria-label="Love percentage slider"
//           style={{ '--slider-percent': `${value}%` }}
//         />
//         <div className="love-meter__labels">
//           <span>0%</span>
//           <span>100%</span>
//         </div>
//       </div>

//       {value < 50 && (
//         <motion.button
//           type="button"
//           className="btn btn-primary"
//           onClick={() => setValue(100)}
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Fix it {'\u2764\ufe0f'}
//         </motion.button>
//       )}
//     </div>
//   );
// }
