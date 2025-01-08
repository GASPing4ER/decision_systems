"use client";

import CriteriaManager from "./CriteriaManager";
import ScoringTable from "./ScoringTable";

const ScoringDisplay = () => {
  return (
    <div className="flex flex-col gap-8 overflow-y-scroll h-[350px]">
      <div>
        <CriteriaManager />
      </div>
      <div>
        <ScoringTable />
      </div>
    </div>
  );
};

export default ScoringDisplay;
