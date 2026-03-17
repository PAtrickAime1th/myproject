import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAPI } from '../utils/api';

export default function QuizPage() {
  const { id } = useParams(); // quiz ID
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submittedScore, setSubmittedScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await fetchAPI(`/api/quizzes/${id}`);
        setQuiz(data);
      } catch (err) {
        console.error('Error fetching quiz:', err);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleChange = (qId, optionId) => {
    setAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetchAPI('/api/submissions', 'POST', {
        quiz_id: quiz.id,
        answers
      });

      if (res.score !== undefined) {
        setSubmittedScore(res.score);
      } else {
        alert('Submission error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Submission failed');
    }
  };

  if (!quiz) return <div className="text-center mt-5">Loading...</div>;

  // After submission — display “You are finished!” + score
  if (submittedScore !== null)
    return (
      <div className="container text-center mt-5">
        <h2>{quiz.title}</h2>
        <h4 className="mt-3">🎉 You are finished! 🎉</h4>
        <p className="fs-5">
          Your score: {submittedScore} / {quiz.questions.length}
        </p>
        <button className="btn btn-dark mt-3" onClick={() => navigate('/')}>
          Back to Quizzes
        </button>
      </div>
    );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{quiz.title}</h2>
      {quiz.questions?.map((q, idx) => (
        <div key={q.id} className="mb-4">
          <p>
            {idx + 1}. {q.question_text}
          </p>
          {q.options?.map(opt => (
            <div className="form-check" key={opt.id}>
              <input
                type="radio"
                className="form-check-input"
                name={`question-${q.id}`}
                id={`opt-${opt.id}`}
                value={opt.id}
                onChange={() => handleChange(q.id, opt.id)}
                disabled={submittedScore !== null} // disable after submit
              />
              <label htmlFor={`opt-${opt.id}`} className="form-check-label">
                {opt.option_text}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button className="btn btn-dark" onClick={handleSubmit}>
        Submit Quiz
      </button>
    </div>
  );
}