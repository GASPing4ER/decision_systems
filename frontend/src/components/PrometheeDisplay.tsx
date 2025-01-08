"use client";

import ScoringDisplay from "./ScoringDisplay";

const PrometheeDisplay = () => {
  return (
    <div className="flex w-full flex-col gap-8 overflow-y-scroll h-[350px]">
      <ScoringDisplay />
    </div>
  );
};

export default PrometheeDisplay;
