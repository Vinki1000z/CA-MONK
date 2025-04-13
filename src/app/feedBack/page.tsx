"use client"
import React, { useEffect, useState } from 'react'
import Header from '../dashboard/components/Header'
import { useRouter } from 'next/navigation'
import { IoIosArrowDown } from "react-icons/io";
import { CircularProgressbar } from 'react-circular-progressbar';
import { PromptCard } from './components/PromptCard';
import questions from '@/app/assignment/components/questions.json'; // Ensure this JSON is structured correctly
import 'react-circular-progressbar/dist/styles.css';

export default function Page() {
  const router = useRouter();
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Array<Array<string | null>>>([]);
  const [score, setScore] = useState(0);
  const [promptData, setPromptData] = useState<any[]>([]);

  useEffect(() => {
    const storedAnswers = localStorage.getItem("userAnswers");
    const storedScore = localStorage.getItem("score");

    if (!storedAnswers || !storedScore) {
      router.push("/dashboard");
    } else {
      try {
        setUserAnswers(JSON.parse(storedAnswers));
        const score = parseInt(storedScore, 10);
        const percentageScore = (score / 10) * 100; 
        setScore(percentageScore);
        generatePromptData(JSON.parse(storedAnswers)); 
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
        router.push("/dashboard");
      }
    }
  }, []);

  // Function to generate prompt data
  const generatePromptData = (answers: Array<Array<string | null>>) => {
    const prompts = questions.map((q, index) => {
      const questionChunks = q.question.split("_____________");
      const correctAnswer = q.correctAnswer;
      const userAnswer = answers[index];
      let status: "correct" | "incorrect";
  
      let isCorrect = true;
  
      // Check if all words match the correct answer
      for (let i = 0; i < correctAnswer.length; i++) {
        if (userAnswer[i] !== correctAnswer[i]) {
          isCorrect = false;
          break;
        }
      }
  
      if (isCorrect) {
        status = "correct";
      } else {
        status = "incorrect";
      }
  
      let inputQuestion = '';
      let inputAnswer = '';

      questionChunks.forEach((chunk, index) => {
        inputQuestion += chunk; // Append the chunk to the question string
        inputAnswer+=chunk
        if (index < userAnswer.length) {
          if (userAnswer[index] !== null) {
            inputAnswer += `<strong>${userAnswer[index]}</strong>`; // Bold user answer
          } else {
            inputAnswer += '_____________'; // Blank placeholder
          }
        }
  
        if (index < correctAnswer.length) {
          inputQuestion += `<strong>${correctAnswer[index]}</strong>`;
        }
      });
  
      return {
        promptNumber: index + 1,
        totalPrompts: questions.length,
        question: inputQuestion,
        answer: inputAnswer, // Return answer with bolded text
        status,
      };
    });
  
    setPromptData(prompts); // Set the generated data in state
  };
  

  return (
    <main className="flex flex-col w-full min-h-screen bg-stone-50">
      <Header />
      <div className="flex flex-1 items-center justify-center w-full px-4">
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
          <CircularProgressbar value={score} text={`${score}%`} className='w-[200px] h-[200px]' />
          <p className="text-[#2A2D2D] text-center text-lg font-normal leading-7 tracking-[-0.18px] max-w-[743px] max-md:text-base max-md:leading-6 max-sm:text-sm max-sm:leading-[22px]">
            While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness. Review your responses below for more details.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-[270.5px] h-[54px] border text-[#453FE1] text-base font-medium leading-[22px] tracking-[-0.16px] cursor-pointer px-6 py-4 rounded-lg border-solid border-[#453FE1] max-sm:w-full max-sm:max-w-[270.5px]"
          >
            Go to Dashboard
          </button>
          <IoIosArrowDown className='cursor-pointer text-2xl' onClick={() => setShowResult(!showResult)} />

          {showResult && promptData.map((prompt) => (
            <PromptCard
              key={prompt.promptNumber}
              promptNumber={prompt.promptNumber}
              totalPrompts={prompt.totalPrompts}
              promptContent={prompt.question}
              response={prompt.answer}
              status={prompt.status}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
