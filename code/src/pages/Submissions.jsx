import React, { useEffect, useState } from 'react';
import { fetchAPI } from '../utils/api';

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const data = await fetchAPI('/submissions');
      setSubmissions(data);
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">My Submissions</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Quiz</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(s => (
            <tr key={s.id}>
              <td>{s.quizTitle}</td>
              <td>{s.score}</td>
              <td>{new Date(s.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}