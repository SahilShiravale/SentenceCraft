// src/components/FeedbackScreen.tsx
import React from "react";

type Question = {
  id: number;
  sentence: string;
  correctAnswer: string[];
  options: string[];
};

type FeedbackScreenProps = {
  questions: Question[];
  userAnswers: string[][];
  onRestart: () => void;
};

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  questions,
  userAnswers,
  onRestart,
}) => {
  const score = questions.reduce((acc, q, idx) => {
    const isCorrect = JSON.stringify(q.correctAnswer) === JSON.stringify(userAnswers[idx]);
    return acc + (isCorrect ? 1 : 0);
  }, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Your Score: {score} / {questions.length}</h2>

      {questions.map((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = JSON.stringify(question.correctAnswer) === JSON.stringify(userAnswer);

        return (
          <div
            key={question.id}
            className="mb-6 p-4 rounded-xl shadow-md border border-gray-200 bg-white"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Question {index + 1}
            </h3>
            <p className="text-lg mb-2 text-gray-600">
              {question.sentence.split("__").map((part, i) => (
                <span key={i}>
                  {part}
                  {i < userAnswer.length && (
                    <span
                      className={`font-semibold px-2 py-1 rounded mx-1 ${
                        userAnswer[i] === question.correctAnswer[i]
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {userAnswer[i]}
                    </span>
                  )}
                </span>
              ))}
            </p>
            {!isCorrect && (
              <p className="text-sm text-gray-500 mt-2">
                ✅ Correct answer:{" "}
                {question.correctAnswer.map((word, i) => (
                  <span key={i} className="inline-block mr-2 text-green-700 font-medium">
                    {word}
                  </span>
                ))}
              </p>
            )}
          </div>
        );
      })}

      <div className="text-center mt-8">
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;
