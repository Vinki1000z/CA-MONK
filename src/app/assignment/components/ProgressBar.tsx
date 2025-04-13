import React from "react";

interface ProgressBarProps {
  totalSteps: number;
  completedSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  totalSteps,
  completedSteps,
}) => {
  return (
    <div className="flex w-full gap-2 flex-wrap">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`min-h-1 flex-1 shrink basis-[0%] rounded-[10.631px] ${
            index < completedSteps ? "bg-[#F2A531]" : "bg-[#DFE3E3]"
          }`}
        />
      ))}
    </div>
  );
};
