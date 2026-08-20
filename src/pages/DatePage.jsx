import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DateTypePicker from '../components/DateTypePicker';
import DateTimePicker from '../components/DateTimePicker';
import LocationPicker from '../components/LocationPicker';
import DateConfirmation from '../components/DateConfirmation';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './DatePage.scss';

const STEPS = ['activity', 'datetime', 'location', 'confirm'];

export default function DatePage() {
  const [plan, setPlan] = useLocalStorage('jmy-date-plan', {
    activity: '',
    date: '',
    time: '',
    notes: '',
    location: '',
    saved: false,
  });
  const [step, setStep] = useState(0);

  const goTo = (index) => setStep(Math.max(0, Math.min(STEPS.length - 1, index)));

  const updatePlan = (patch) => setPlan((prev) => ({ ...prev, ...patch }));

  const handleStartOver = () => {
    setPlan({
      activity: '',
      date: '',
      time: '',
      notes: '',
      location: '',
      saved: false,
    });
    setStep(0);
  };

  return (
    <div className="page date-page">
      <div className="date-page__progress" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEPS.length}>
        {STEPS.map((label, index) => (
          <span
            key={label}
            className={`date-page__dot ${index <= step ? 'is-active' : ''}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={STEPS[step]}
          initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="date-page__step"
        >
          {step === 0 && (
            <DateTypePicker
              value={plan.activity}
              onSelect={(activity) => updatePlan({ activity })}
              onNext={() => goTo(1)}
            />
          )}
          {step === 1 && (
            <DateTimePicker
              date={plan.date}
              time={plan.time}
              notes={plan.notes}
              onChange={updatePlan}
              onNext={() => goTo(2)}
              onBack={() => goTo(0)}
            />
          )}
          {step === 2 && (
            <LocationPicker
              value={plan.location}
              onSelect={(location) => updatePlan({ location })}
              onNext={() => goTo(3)}
              onBack={() => goTo(1)}
            />
          )}
          {step === 3 && (
            <DateConfirmation
              plan={plan}
              saved={plan.saved}
              onSave={() => updatePlan({ saved: true })}
              onStartOver={handleStartOver}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
