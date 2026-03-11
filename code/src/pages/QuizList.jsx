import React, { useEffect, useState } from 'react';
import { fetchAPI } from '../utils/api';
import { Link } from 'react-router-dom';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await fetchAPI('/quizzes');
      setQuizzes(data);
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">Available Quizzes</h2>
      <div className="row g-3">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{quiz.title}</h5>
                <p className="card-text">{quiz.description}</p>
                <Link
                  to={`/quiz/${quiz.id}`}
                  className="mt-auto btn btn-dark"
                >
                  Start Quiz
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}