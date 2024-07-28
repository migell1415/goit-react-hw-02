import { useState, useEffect } from 'react';
import './App.css';

import { Description } from './components/Description/Description';
import { Feedback } from './components/Feedback/Feedback';
import { Options } from './components/Options/Options';
import { Notification } from './components/Notification/Notification';

export default function App() {
  const getInitialState = () => {
    const savedFeedback = localStorage.getItem('feedback');
    return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
  };

  const [clicked, setClicked] = useState(getInitialState);

  // ===============================================================================================

  const totalFeedback = clicked.bad + clicked.good + clicked.neutral;
  const goodFeedback = totalFeedback ? Math.round((clicked.good / totalFeedback) * 100) : 0;

  const valueOption = {
    good: 'Good',
    neutral: 'Neutral',
    bad: 'Bad',
    reset: 'Reset',
  };

  // ===============================================================================================

  function handleOnClick(type) {
    setClicked((prevState) => {
      const newState = { ...prevState, [type]: prevState[type] + 1 };
      localStorage.setItem('feedback', JSON.stringify(newState));
      return newState;
    });
  }

  function handleReset() {
    const resetState = { good: 0, neutral: 0, bad: 0 };
    setClicked(resetState);
    localStorage.setItem('feedback', JSON.stringify(resetState));
  }

  // ===============================================================================================
  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(clicked));
  }, [clicked]);

  return (
    <section>
      <Description name="Sip Happens Café" paragraph="Please leave your feedback about our service by selecting one of the options below" />
      <Options
        valueOption={valueOption}
        handleReset={handleReset}
        handleOnClick={handleOnClick}
        feedbackCount={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedBack={clicked}
          valueOption={valueOption}
          totalFeedback={totalFeedback}
          goodFeedback={goodFeedback}
        />
      ) : (
        <Notification message="Not feedback yet" />
      )}
    </section>
  );
}
