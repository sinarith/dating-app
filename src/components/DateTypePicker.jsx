import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { dateTypes } from '../data/dateIdeas';
import './DateTypePicker.scss';

export default function DateTypePicker({ value, onSelect, onNext }) {
  return (
    <div className="date-type-picker">
      <h2 className="section-title">
        Okay... now let&rsquo;s plan our date{' '}
        <Heart size={24} className="neon-icon" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
      </h2>
      <p className="section-subtitle">What should we do?</p>

      <div className="date-type-picker__grid">
        {dateTypes.map((type) => {
          const Icon = type.icon;
          return (
            <motion.button
              key={type.id}
              type="button"
              className={`date-type-picker__card ${value === type.id ? 'is-selected' : ''}`}
              onClick={() => onSelect(type.id)}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.96 }}
              aria-pressed={value === type.id}
            >
              <span className="date-type-picker__icon" aria-hidden="true">
                <Icon size={24} className="neon-icon" />
              </span>
              <span>{type.label}</span>
            </motion.button>
          );
        })}
      </div>

      <button
        type="button"
        className="btn btn-primary"
        disabled={!value}
        onClick={onNext}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
      >
        Next <ArrowRight size={18} />
      </button>
    </div>
  );
}