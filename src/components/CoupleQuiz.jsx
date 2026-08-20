import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import quizQuestions from '../data/quizQuestions';
import './CoupleQuiz.scss';

function getResult(score, total) {
  const percent = (score / total) * 100;
  if (percent >= 85) {
    return {
      title: 'Soulmates!',
      text: 'You know us better than anyone.',
    };
  }
  if (percent >= 60) {
    return {
      title: 'Pretty good!',
      text: 'You definitely pay attention.',
    };
  }
  if (percent >= 35) {
    return {
      title: 'Not bad!',
      text: 'We have more to learn about each other.',
    };
  }
  return {
    title: 'Hmm...',
    text: 'Maybe we need more dates to figure us out.',
  };
}

export default function CoupleQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[current];

  const handleSelect = (index) => {
    setSelected(index);
  };

  const handleNext = () => {
    if (selected === null) return;
    setScore((prev) => prev + 1);
    setSelected(null);

    if (current + 1 >= quizQuestions.length) {
      setFinished(true);
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const result = getResult(score, quizQuestions.length);

    return (
      <div className="couple-quiz">
        <h2 className="section-title">How well do you know us?</h2>
        <motion.div
          className="glass-card couple-quiz__result"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="couple-quiz__result-icon">
            <Heart size={64} className="neon-icon" fill="currentColor" />
          </div>
          <h3 className="couple-quiz__result-title">{result.title}</h3>
          <p className="couple-quiz__score">
            You scored {score} / {quizQuestions.length}
          </p>
          <p className="couple-quiz__result-text">{result.text}</p>
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleRestart}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Try again <Heart size={18} fill="currentColor" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="couple-quiz">
      <h2 className="section-title">How well do you know us?</h2>
      <div className="couple-quiz__progress">
        Question {current + 1} of {quizQuestions.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="glass-card couple-quiz__card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
        >
          <p className="couple-quiz__question">{question.question}</p>
          <div className="couple-quiz__options">
            {question.options.map((option, index) => (
              <motion.button
                key={option}
                type="button"
                className={`couple-quiz__option ${selected === index ? 'is-selected' : ''}`}
                onClick={() => handleSelect(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={selected === null}
            onClick={handleNext}
          >
            {current + 1 >= quizQuestions.length ? 'See result' : 'Next'}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}