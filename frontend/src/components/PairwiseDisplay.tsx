"use client";

import { useDataContext } from "@/hooks";
import { PairwiseComparisonTable } from "./PairwiseComparisonTable";

const PairwiseDisplay = () => {
  const { companies } = useDataContext();
  return (
    <div>
      <PairwiseComparisonTable items={companies} />
    </div>
  );
};

export default PairwiseDisplay;
