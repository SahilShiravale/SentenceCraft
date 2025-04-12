 
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-6">Sentence Construction Tool</h1>
      <p className="mb-4">Fill in the blanks using the correct words.</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded" onClick={() => navigate('/quiz')}>
        Start Quiz
      </button>
    </div>
  );
};

export default Home;
