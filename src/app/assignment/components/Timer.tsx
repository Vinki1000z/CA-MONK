import React, { useState, useEffect } from "react";

interface TimerProps {
  initialTime: number;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  totalQuestions: number;
}

export const Timer: React.FC<TimerProps> = ({ 
  initialTime, 
  currentQuestionIndex,
  setCurrentQuestionIndex,
  totalQuestions
}) => {
  const [time, setTime] = useState(initialTime);
  const [timerEnded, setTimerEnded] = useState(false);

  // Reset timer when question changes
  useEffect(() => {
    setTime(initialTime);
    setTimerEnded(false);
  }, [initialTime, currentQuestionIndex]);

  // Handle timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setTimerEnded(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, initialTime]);

  // Handle timer end effects in a separate useEffect
  useEffect(() => {
    if (timerEnded) {
      // Handle time end
      if (currentQuestionIndex < totalQuestions) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
      

      setTimerEnded(false);
    }
  }, [timerEnded, currentQuestionIndex, setCurrentQuestionIndex, totalQuestions]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-gray-500 text-center text-2xl font-semibold leading-none">
      {formatTime(time)}
    </div>
  );
};