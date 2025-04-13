"use client";

import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, children, onClick }) => {
  const baseClasses =
    "px-6 py-2.5 text-base tracking-normal leading-6 rounded-lg cursor-pointer h-[42px] w-[140px] max-sm:w-full";

  const variantClasses = {
    primary: "text-white bg-indigo-600",
    secondary:
      "text-indigo-600 border border-solid border-[color:var(--Primary-600,#453FE1)]",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface ActionButtonsProps {
  onBack?: () => void;
  onStart?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onBack, onStart }) => {
  return (
    <div className="flex gap-4 items-center mt-16 max-sm:flex-col max-sm:gap-3 max-sm:w-full">
      <Button variant="secondary" onClick={onBack}>
        Back
      </Button>
      <Button variant="primary" onClick={onStart}>
        Start
      </Button>
    </div>
  );
};

export default ActionButtons;
