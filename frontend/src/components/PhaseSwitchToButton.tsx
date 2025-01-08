"use client";

import Link from "next/link";
import { useDataContext } from "../hooks";
import { PhaseProps } from "../types";

type PhaseSwitchToButtonProps = {
  nextPhase: PhaseProps;
};
const PhaseSwitchToButton = ({ nextPhase }: PhaseSwitchToButtonProps) => {
  const { setPhase } = useDataContext();
  if (nextPhase !== "results") {
    return (
      <button
        className="bg-black text-white px-6 py-2 rounded-xl mx-auto uppercase"
        onClick={() => setPhase(nextPhase)}
      >
        Next phase
      </button>
    );
  } else {
    return (
      <Link
        href="/results"
        className="bg-black text-white px-6 py-2 rounded-xl mx-auto uppercase"
      >
        SEE RESULTS
      </Link>
    );
  }
};

export default PhaseSwitchToButton;
