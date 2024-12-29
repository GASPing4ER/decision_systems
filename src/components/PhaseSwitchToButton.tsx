"use client";

import { useDataContext } from "@/hooks";
import { PhaseProps } from "@/types";

type PhaseSwitchToButtonProps = {
  nextPhase: PhaseProps;
};
const PhaseSwitchToButton = ({ nextPhase }: PhaseSwitchToButtonProps) => {
  const { setPhase } = useDataContext();

  return (
    <button
      className="bg-black text-white px-6 py-2 rounded-xl mx-auto uppercase"
      onClick={() => setPhase(nextPhase)}
    >
      Next phase
    </button>
  );
};

export default PhaseSwitchToButton;
