import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAPI } from '../utils/api';

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submittedScore, setSubmittedScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await fetchAPI(`/api/quizzes/${id}`);
      setQuiz(data);
    };
    fetchQuiz();
  }, [id]);

  const handleChange = (qId, optionId) => {
    setAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const handleSubmit = async () => {
    const res = await fetchAPI('/api/submissions', 'POST', { quiz_id: quiz.id, answers });
    if (res.score !== undefined) setSubmittedScore(res.score);
    else alert('Submission error');
  };

  if (!quiz) return <div className="text-center mt-5">Loading...</div>;

  if (submittedScore !== null)
    return (
      <div className="container text-center mt-5">
        <h2>{quiz.title}</h2>
        <h4>Your score: {submittedScore} / {quiz.questions.length}</h4>
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
          <p>{idx + 1}. {q.text}</p>
          {q.options?.map(opt => (
            <div className="form-check" key={opt.id}>
              <input
                type="radio"
                className="form-check-input"
                name={`question-${q.id}`}
                id={`opt-${opt.id}`}
                value={opt.id}
                onChange={() => handleChange(q.id, opt.id)}
              />
              <label htmlFor={`opt-${opt.id}`} className="form-check-label">{opt.option_text}</label>
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