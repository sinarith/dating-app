import './DateTimePicker.scss';

export default function DateTimePicker({ date, time, notes, onChange, onNext, onBack }) {
  return (
    <div className="date-time-picker">
      <h2 className="section-title">When should we go?</h2>

      <div className="glass-card date-time-picker__form">
        <label className="date-time-picker__field">
          <span>Date</span>
          <input
            type="date"
            value={date}
            onChange={(event) => onChange({ date: event.target.value })}
          />
        </label>

        <label className="date-time-picker__field">
          <span>Time</span>
          <input
            type="time"
            value={time}
            onChange={(event) => onChange({ time: event.target.value })}
          />
        </label>

        <label className="date-time-picker__field">
          <span>Notes (optional)</span>
          <textarea
            rows={3}
            placeholder="Anything you want me to know..."
            value={notes}
            onChange={(event) => onChange({ notes: event.target.value })}
          />
        </label>
      </div>

      <div className="date-time-picker__actions">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          {'\u2190'} Back
        </button>
        <button type="button" className="btn btn-primary" disabled={!date || !time} onClick={onNext}>
          Next {'\u2192'}
        </button>
      </div>
    </div>
  );
}
