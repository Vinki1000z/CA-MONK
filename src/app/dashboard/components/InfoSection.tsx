"use client";

import React from "react";
import Image from "next/image";

interface InfoItemProps {
    title: string;
    children: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ title, children }) => {
    return (
        <div className="flex flex-col gap-4 items-center">
            <h3 className="text-xl leading-7 text-center text-zinc-800">{title}</h3>
            <div className="text-lg tracking-normal leading-7 text-zinc-500">
                {children}
            </div>
        </div>
    );
};

const Divider: React.FC = () => {
    return <div className="w-px bg-zinc-200 h-[54px] max-sm:hidden" />;
};

const InfoSection: React.FC = () => {
    return (
        <section className="flex gap-8 items-center max-sm:flex-col max-sm:gap-6">
            <InfoItem title="Time Per Question">30 sec</InfoItem>
            <Divider />
            <InfoItem title="Total Questions">10</InfoItem>
            <Divider />
            <InfoItem title="Coins">
                <div className="flex items-center gap-1">
                    0
                    <Image src="/images/coin.png" alt="Coin" width={20} height={20} />
                </div>
            </InfoItem>

        </section>
    );
};

export default InfoSection;
