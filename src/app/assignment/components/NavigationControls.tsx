import React from "react";

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrevious,
  onNext,
  canGoNext,
  canGoPrevious,
}) => {
  return (
    <div className="flex w-full gap-[40px_100px] justify-between flex-wrap mt-10 max-md:max-w-full">
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`justify-center items-center border border-[color:var(--Neutral-200,#DFE3E3)] flex min-h-16 flex-col overflow-hidden w-16 h-16 px-0.5 rounded-lg border-solid ${
          !canGoNext ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Next question"
      >
        <img src="https://cdn.builder.io/api/v1/image/assets/621a9be51e55481592185121250bd32e/c5b947f6e4859233f7c985324418660f43191797?placeholderIfAbsent=true" alt="Next" className="aspect-[1] object-contain w-6" />
      </button>
    </div>
  );
};