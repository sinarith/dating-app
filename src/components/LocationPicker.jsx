import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, ArrowLeft, ArrowRight } from 'lucide-react';
import { locationOptions } from '../data/dateIdeas';
import './LocationPicker.scss';

export default function LocationPicker({ value, onSelect, onNext, onBack }) {
  const [customLocation, setCustomLocation] = useState(
    locationOptions.some((option) => option.id === value) ? '' : value || ''
  );
  const [showCustom, setShowCustom] = useState(false);

  const handleOptionSelect = (id) => {
    setShowCustom(false);
    onSelect(id);
  };

  const handleCustomSubmit = () => {
    if (customLocation.trim()) {
      onSelect(customLocation.trim());
    }
  };

  return (
    <div className="location-picker">
      <h2 className="section-title">Where should I take you?</h2>

      <div className="location-picker__grid">
        {locationOptions.map((option) => {
          const Icon = option.icon;
          return (
            <motion.button
              key={option.id}
              type="button"
              className={`location-picker__card ${value === option.id ? 'is-selected' : ''}`}
              onClick={() => handleOptionSelect(option.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span aria-hidden="true">
                <Icon size={24} className="neon-icon" />
              </span>
              <span>{option.label}</span>
            </motion.button>
          );
        })}
      </div>

      <button
        type="button"
        className="location-picker__custom-toggle"
        onClick={() => setShowCustom((show) => !show)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
      >
        Or type your own place <Pencil size={16} />
      </button>

      {showCustom && (
        <div className="location-picker__custom">
          <input
            type="text"
            placeholder="Enter a location..."
            value={customLocation}
            onChange={(event) => setCustomLocation(event.target.value)}
          />
          <button type="button" className="btn btn-ghost" onClick={handleCustomSubmit}>
            Use this
          </button>
        </div>
      )}

      <div className="location-picker__actions">
        <button 
          type="button" 
          className="btn btn-ghost" 
          onClick={onBack}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={18} /> Back
        </button>
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
    </div>
  );
}