import React from "react";
interface QuestionPromptProps {
  questionChunks: string[];
  selectedWords: (string | null)[];
  onSlotClick: (index: number) => void;
  activeSlotIndex: number | null;
}

export const QuestionPrompt: React.FC<QuestionPromptProps> = ({
  questionChunks,
  selectedWords,
  onSlotClick,
  activeSlotIndex,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[#2A2D2D] text-xl font-medium leading-tight mt-8">
      {questionChunks.map((chunk, index) => (
        <React.Fragment key={index}>
          <span>{chunk}</span>
          {index < selectedWords.length && (
            <button
              onClick={() => onSlotClick(index)}
              className={`mx-1 px-3 py-2 rounded-md border border-gray-300 bg-white min-w-[90px] ${
                selectedWords[index] ? "bg-gray-200" : ""
              } ${activeSlotIndex === index ? "ring-2 ring-blue-500" : ""}`}
            >
              {selectedWords[index] || "_____"}
            </button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
