 
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../services/api';
import { Question } from '../types';
import SentenceCard from '../components/SentenceCard';
import Timer from '../components/Timer';

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (questions.length > 0) {
      setSelectedWords(new Array(questions[currentIndex].answer.length).fill(''));
      setTimeLeft(30);
    }
  }, [currentIndex, questions]);

  const handleSelect = (blankIndex: number, word: string) => {
    const updated = [...selectedWords];
    if (!updated.includes(word)) {
      updated[blankIndex] = word;
      setSelectedWords(updated);
    }
  };

  const handleUnselect = (index: number) => {
    const updated = [...selectedWords];
    updated[index] = '';
    setSelectedWords(updated);
  };

  const handleNext = () => {
    setAnswers([...answers, selectedWords]);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/result', { state: { questions, answers: [...answers, selectedWords] } });
    }
  };

  if (questions.length === 0) return <p>Loading...</p>;

  const currentQuestion = questions[currentIndex];
  const isNextEnabled = selectedWords.every(word => word !== '');

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      <h2 className="text-2xl font-bold mb-4">Question {currentIndex + 1}</h2>
      <SentenceCard
        sentence={currentQuestion.sentence}
        selectedWords={selectedWords}
        onSelect={handleSelect}
        onUnselect={handleUnselect}
        options={currentQuestion.options}
      />
      <button
        className={`mt-6 px-6 py-2 rounded ${
          isNextEnabled ? 'bg-green-600 text-white' : 'bg-gray-400 cursor-not-allowed'
        }`}
        onClick={handleNext}
        disabled={!isNextEnabled}
      >
        Next
      </button>
    </div>
  );
};

export default Quiz;
