import React, { useState, useEffect } from "react";
import { Timer } from "./Timer";
import { ProgressBar } from "./ProgressBar";
import { QuestionPrompt } from "./QuestionPrompt";
import { WordBank } from "./WordBank";
import { useRouter } from 'next/navigation';
import questions from './questions.json';
import { json } from "stream/consumers";

export const TestScreen: React.FC = () => {
  const router = useRouter();
  const totalQuestions = questions.length;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<Array<Array<string | null>>>([]);
  const [score, setScore] = useState(0);
  const [selectedWords, setSelectedWords] = useState<(string | null)[]>([null, null, null, null]);
  const [slots, setSlots] = useState<Array<{ id: string, word: string, isSelected: boolean }>>([]);

  // Initialize user answers array with empty arrays for each question
  useEffect(() => {
    localStorage.clear();
    const initialUserAnswers = questions.map(() => [null, null, null, null]);
    setUserAnswers(initialUserAnswers);
    
    // Setup initial word bank for the first question
    setupWordBank(currentQuestionIndex);
  }, []);

  // Setup word bank when moving to a new question
  const setupWordBank = (questionIndex: number) => {
    if (!questions[questionIndex]) return;
    
    const options = questions[questionIndex].options;
    const newSlots = options.map((word, index) => ({
      id: index.toString(),
      word,
      isSelected: false
    }));
    setSlots(newSlots);
      // Load previous answers if they exist
      setSelectedWords([null, null, null, null]);
      console.log(userAnswers);
  };

  const handleSlotClick = (index: number) => {
    setActiveSlotIndex(prev => (prev === index ? null : index)); // toggle selection
    
    const wordToRemove = selectedWords[index];
    if (!wordToRemove) return;

    const updatedSlots = slots.map(slot =>
      slot.word === wordToRemove ? { ...slot, isSelected: false } : slot
    );

    const updatedSelectedWords = [...selectedWords];
    updatedSelectedWords[index] = null;

    setSlots(updatedSlots);
    setSelectedWords(updatedSelectedWords);
    
    // Update user answers
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = updatedSelectedWords;
    setUserAnswers(updatedUserAnswers);
  };

  const handleWordClick = (id: string) => {
    if (activeSlotIndex === null) return;

    const word = slots.find(slot => slot.id === id)?.word;
    if (!word) return;

    const updatedSelectedWords = [...selectedWords];
    updatedSelectedWords[activeSlotIndex] = word;

    const updatedSlots = slots.map(slot =>
      slot.id === id ? { ...slot, isSelected: true } : slot
    );

    setSelectedWords(updatedSelectedWords);
    setSlots(updatedSlots);
    setActiveSlotIndex(null); // clear after selection
    
    // Update user answers
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = updatedSelectedWords;
    setUserAnswers(updatedUserAnswers);
  };

  const calculateScore = () => {
    let correctCount = 0;
    
    userAnswers.forEach((answer, index) => {
      const correctAnswer = questions[index].correctAnswer;
      let isCorrect = true;
      
      // Check if all words match the correct answer
      for (let i = 0; i < correctAnswer.length; i++) {
        if (answer[i] !== correctAnswer[i]) {
          isCorrect = false;
          break;
        }
      }
      
      if (isCorrect) correctCount++;
    });
    
    setScore(correctCount);
    return correctCount;
  };

  // Update word bank when changing questions
  useEffect(() => {
    console.log(currentQuestionIndex,totalQuestions);
    if (currentQuestionIndex == totalQuestions ) {

      const finalScore = calculateScore();
      localStorage.setItem("score", JSON.stringify(score));
      localStorage.setItem("userAnswers",JSON.stringify(userAnswers));
      console.log(`Test completed. Score: ${finalScore}/${totalQuestions}`);
      router.push("/feedBack");
    }
    setupWordBank(currentQuestionIndex);
  }, [currentQuestionIndex]);

  const handleQuit = () => {
    router.push('/dashboard');
  };

  // Get current question data
  const currentQuestion = questions[currentQuestionIndex] || { 
    question: "Loading...", 
    options: [], 
    correctAnswer: [] 
  };
  
  const questionChunks = currentQuestion.question.split("_____________");



  return (
    <main className="justify-center items-center bg-[#F8F8F8] flex flex-col overflow-hidden px-20 py-[113px] max-md:px-5 max-md:py-[100px]">
      <section className="shadow-[0px_var(--sds-size-depth-100)_50px_0px_rgba(69,69,69,0.07)] bg-white w-full max-w-[975px] p-10 rounded-3xl max-md:max-w-full max-md:px-5">
        <div className="w-full max-md:max-w-full">
          <div className="flex w-full items-center gap-[40px_100px] whitespace-nowrap justify-between flex-wrap max-md:max-w-full">
            <Timer
              initialTime={30}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              totalQuestions={totalQuestions - 1}
            />
            <button
              onClick={handleQuit}
              className="self-stretch border border-[color:var(--Neutral-200,#DFE3E3)] gap-2 text-lg text-[#414343] font-medium tracking-[-0.18px] leading-loose my-auto px-5 py-2 rounded-lg border-solid"
            >
              Quit
            </button>
          </div>
          <ProgressBar
            totalSteps={totalQuestions}
            completedSteps={currentQuestionIndex}
          />
        </div>
        <div className="w-full mt-14 max-md:max-w-full max-md:mt-10">
          <div className="flex w-full flex-col items-stretch max-md:max-w-full">
            <div className="flex w-full flex-col items-stretch max-md:max-w-full">
              <h1 className="text-[#616464] text-center text-xl font-semibold leading-[1.1] max-md:max-w-full">
                Select the missing words in the correct order
              </h1>
              <p className="text-center text-gray-500 mt-2 mb-4">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
              <QuestionPrompt
                questionChunks={questionChunks}
                selectedWords={selectedWords}
                onSlotClick={handleSlotClick}
                activeSlotIndex={activeSlotIndex}
              />
            </div>
            <WordBank
              slots={slots}
              onWordClick={handleWordClick}
            />
          </div>
        </div>
      </section>
    </main>
  );
};