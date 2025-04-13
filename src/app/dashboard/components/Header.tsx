"use client";

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-center items-center w-full h-16 shadow-2xl backdrop-blur-[25px] bg-stone-50 bg-opacity-80">
      <h1 className="text-lg font-medium tracking-normal leading-7 text-neutral-700">
        Sentence Construction
      </h1>
    </header>
  );
};

export default Header;
