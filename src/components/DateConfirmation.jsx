import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { dateTypes, locationOptions } from '../data/dateIdeas';
import { sendDateToTelegram } from '../utils/telegram';
import './DateConfirmation.scss';

function formatDate(dateString) {
  if (!dateString) return 'Not set';
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime(timeString) {
  if (!timeString) return 'Not set';
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

export default function DateConfirmation({ plan, saved, onSave, onStartOver }) {
  const [isSending, setIsSending] = useState(false);

  // Find selected preset objects
  const selectedType = dateTypes.find((type) => type.id === plan.activity);
  const selectedLocation = locationOptions.find((option) => option.id === plan.location);

  // Extract component references
  const TypeIcon = selectedType?.icon;
  const LocationIcon = selectedLocation?.icon;

  const handleSave = async () => {
    setIsSending(true);

    // Prepare human-readable labels for Telegram
    const formattedPlan = {
      date: formatDate(plan.date),
      time: formatTime(plan.time),
      location: selectedLocation ? selectedLocation.label : plan.location,
      activity: selectedType ? selectedType.label : plan.activity,
      notes: plan.notes,
    };

    // Send data to Telegram
    await sendDateToTelegram(formattedPlan);

    // Call local state save handler
    if (typeof onSave === 'function') {
      onSave();
    }

    setIsSending(false);
  };

  return (
    <motion.div
      className="date-confirmation"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-title">
        {saved ? "It's officially a date! " : 'Our Date '}
        <Heart size={24} className="neon-icon" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
      </h2>

      <div className="glass-card date-confirmation__card">
        <div className="date-confirmation__row">
          <span className="date-confirmation__label">Date</span>
          <span className="date-confirmation__value">{formatDate(plan.date)}</span>
        </div>

        <div className="date-confirmation__row">
          <span className="date-confirmation__label">Time</span>
          <span className="date-confirmation__value">{formatTime(plan.time)}</span>
        </div>

        <div className="date-confirmation__row">
          <span className="date-confirmation__label">Place</span>
          <span className="date-confirmation__value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {LocationIcon && <LocationIcon size={18} className="neon-icon" />}
            {selectedLocation ? selectedLocation.label : plan.location || 'Not set'}
          </span>
        </div>

        <div className="date-confirmation__row">
          <span className="date-confirmation__label">Activity</span>
          <span className="date-confirmation__value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {TypeIcon && <TypeIcon size={18} className="neon-icon" />}
            {selectedType ? selectedType.label : 'Not set'}
          </span>
        </div>

        {plan.notes && (
          <div className="date-confirmation__row">
            <span className="date-confirmation__label">Notes</span>
            <span className="date-confirmation__value">{plan.notes}</span>
          </div>
        )}
      </div>

      <div className="date-confirmation__actions">
        {!saved && (
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleSave}
            disabled={isSending}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            {isSending ? (
              'Sending...'
            ) : (
              <>
                Save Our Date <Heart size={18} fill="currentColor" />
              </>
            )}
          </button>
        )}
        <button type="button" className="btn btn-ghost" onClick={onStartOver}>
          Start Over
        </button>
      </div>

      {saved && (
        <p className="date-confirmation__saved" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          Saved on this device <Sparkles size={16} />
        </p>
      )}
    </motion.div>
  );
}