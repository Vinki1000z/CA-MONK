"use client";

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-20 py-0 w-full h-16 shadow-2xl backdrop-blur-[25px] bg-stone-50 bg-opacity-80 max-md:px-10 max-md:py-0 max-sm:px-5 max-sm:py-0">
      <div className="flex gap-2 items-center w-[136px]" />
      <h1 className="px-6 py-0 h-16 text-lg tracking-normal leading-7 rounded-lg text-neutral-700">
        Sentence Construction
      </h1>
      <div className="flex justify-end items-center w-[136px]">
        <button
          className="flex justify-center items-center w-16 h-16 rounded-lg"
          aria-label="Menu"
        >
        
        </button>
      </div>
    </header>
  );
};

export default Header;
