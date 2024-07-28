import s from './Feedback.module.css';
export function Feedback({
  totalFeedback,
  goodFeedback,
  feedBack: { good, neutral, bad },
}) {
  return (
    <>
      <ul className={s.decor}>
        <li>Good:{good}</li>
        <li>Neutral:{neutral}</li>
        <li>Bad:{bad}</li>
        <li>Total:{totalFeedback}</li>
        <li>Positive:{goodFeedback}%</li>
      </ul>
    </>
  );
}