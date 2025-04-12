import { useEffect } from 'react';

interface TimerProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

const Timer = ({ timeLeft, setTimeLeft }: TimerProps) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [setTimeLeft]);

  return <p className="text-right text-red-500">Time left: {timeLeft}s</p>;
};

export default Timer;
