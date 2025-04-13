"use client";

import React from "react";
import Header from "./Header";
import InfoSection from "./InfoSection";
import ActionButtons from "./ActionButtons";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SentenceConstruction: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <main className="flex flex-col items-center w-full min-h-screen bg-stone-50">
        <Header />

        <section className="flex flex-col gap-16 items-center px-5 py-0 mt-36 w-full max-w-[627px] max-md:mt-20">
          <div className="flex flex-col gap-24 items-center">
            <div className="flex flex-col gap-8 items-center">
              <Image src="/images/pen_paper.png" alt="Logo" width={100} height={100}/>

              <div className="flex flex-col gap-3 items-center text-center">
                <h2 className="text-4xl font-bold leading-10 text-stone-950">
                  Sentence Construction
                </h2>
                <p className="text-xl tracking-normal leading-7 max-w-[627px] text-zinc-500">
                  Select the correct words to complete the sentence by arranging
                  the provided options in the right order.
                </p>
              </div>
            </div>

            <InfoSection />
          </div>

          <ActionButtons
            onBack={() => router.push('/dashbaord')}
            onStart={() => router.push('/assignment')}
          />
        </section>
      </main>
    </>
  );
};

export default SentenceConstruction;
