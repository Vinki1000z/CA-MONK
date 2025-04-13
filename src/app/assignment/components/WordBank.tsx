import React from "react";

interface Slot {
  id: string;
  word: string;
  isSelected: boolean;
}

interface WordBankProps {
  slots: Slot[];
  onWordClick: (id: string) => void;
}

export const WordBank: React.FC<WordBankProps> = ({ slots, onWordClick }) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-4 mt-10 text-base text-[#414343] font-medium tracking-[-0.16px] leading-none">
      {slots.map(({ id, word, isSelected }) => (
        <button
          key={id}
          onClick={() => onWordClick(id)}
          disabled={isSelected}
          className={`px-3 py-2 rounded-lg border border-solid border-neutral-300 bg-white transition-opacity duration-200 ${
            isSelected ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
        >
          {word}
        </button>
      ))}
    </div>
  );
};
