"use client";

import { useDataContext } from "@/hooks";
import PhaseSwitchToButton from "./PhaseSwitchToButton";
import CriteriaSelection from "./CriteriaSelection";

const CriteriaDisplay = () => {
  const { phase, criteria } = useDataContext();
  if (phase === "criteria") {
    return (
      <section className="h-full flex flex-col items-center gap-4">
        <h1 className="text-2xl text-center py-4">
          CHOOSE CRITERIAS TO COMPARE:
        </h1>
        <CriteriaSelection />

        {criteria && criteria.length > 1 && (
          <PhaseSwitchToButton nextPhase="methods" />
        )}
      </section>
    );
  }
};

export default CriteriaDisplay;
