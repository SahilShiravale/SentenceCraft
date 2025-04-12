 
import React from 'react';

interface SentenceCardProps {
  sentence: string;
  selectedWords: string[];
  onSelect: (index: number, word: string) => void;
  options: string[];
  onUnselect: (index: number) => void;
}

const SentenceCard: React.FC<SentenceCardProps> = ({ sentence, selectedWords, onSelect, options, onUnselect }) => {
  const blanks = sentence.split("___");

  return (
    <div className="text-xl">
      <p>
        {blanks.map((part, idx) => (
          <React.Fragment key={idx}>
            {part}
            {idx < selectedWords.length && (
              <span
                className="inline-block min-w-[50px] p-1 border-b-2 border-gray-400 cursor-pointer text-blue-600"
                onClick={() => onUnselect(idx)}
              >
                {selectedWords[idx] || '____'}
              </span>
            )}
          </React.Fragment>
        ))}
      </p>
      <div className="flex flex-wrap gap-4 mt-4">
        {options.map((word, idx) => (
          <button key={idx} className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => onSelect(selectedWords.indexOf(''), word)}>
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SentenceCard;
