import React from 'react'

interface PromptCardProps {
  promptNumber: number;
  totalPrompts: number;
  promptContent: string;
  response: string;
  status: string;
}

export const PromptCard: React.FC<PromptCardProps> = ({
    promptNumber,
    totalPrompts,
    promptContent,
    response,
    status,
  }) => {
    const getStatusStyles = () => {
      switch (status) {
        case "correct":
          return "bg-[#EEFBEF] text-[#317F39]";
        case "incorrect":
          return "bg-red-50 text-red-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    };
  
    return (
      <article className="bg-white w-full pt-4 rounded-2xl shadow-[0px_4px_70px_0px_rgba(66,169,76,0.10)] items-center">
        <div className="w-full px-4">
          <div className="flex w-full items-center justify-between gap-y-2 text-sm font-medium tracking-[-0.14px] flex-wrap">
            <div
              className="bg-[#F0F0F0] text-[#616464] px-2 py-1 rounded-lg"
              role="status"
            >
              Prompt
            </div>
            <div className="text-[#414343]">
              {promptNumber}
              <span className="font-normal text-[#7C8181]">/{totalPrompts}</span>
            </div>
          </div>
          <div
            className="text-base text-[#414343] font-normal tracking-[-0.16px] mt-3 p-2"
            role="textbox"
            aria-label="Prompt content"
            dangerouslySetInnerHTML={{ __html: promptContent }}
          >
          </div>
        </div>
        <div className="bg-[#F6F9F9] w-full flex flex-col mt-6 p-6 rounded-b-2xl">
          <div className="flex items-center gap-2 text-base font-medium tracking-[-0.16px] justify-center">
            <div className="text-[#616464]">Your response</div>
            <div
              className={`px-2 py-1 rounded-2xl ${getStatusStyles()}`}
              role="status"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          </div>
          <div
            className="text-[#2A2D2D] text-lg font-normal leading-7 tracking-[-0.18px] mt-3"
            dangerouslySetInnerHTML={{ __html: response }} // Render response as HTML
          />
        </div>
      </article>
    );
  };
  
