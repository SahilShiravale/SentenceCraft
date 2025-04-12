 
import { useLocation, useNavigate } from 'react-router-dom';
import { Question } from '../types';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, answers }: { questions: Question[]; answers: string[][] } = location.state;

  const score = questions.reduce((acc, q, i) => {
    const correct = JSON.stringify(q.answer) === JSON.stringify(answers[i]);
    return acc + (correct ? 1 : 0);
  }, 0);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Your Score: {score}/10</h2>
      {questions.map((q, i) => {
        const isCorrect = JSON.stringify(q.answer) === JSON.stringify(answers[i]);
        return (
          <div key={q.id} className={`mb-4 p-4 border rounded ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
            <p className="font-semibold">Q{i + 1}: {q.sentence}</p>
            <p>Your Answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{answers[i].join(' ')}</span></p>
            {!isCorrect && <p>Correct Answer: <span className="text-green-600">{q.answer.join(' ')}</span></p>}
          </div>
        );
      })}
      <button
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
        onClick={() => navigate('/')}
      >
        Go Home
      </button>
    </div>
  );
};

export default Result;
