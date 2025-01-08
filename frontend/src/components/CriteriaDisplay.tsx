"use client";

import { useState } from "react";
import { useDataContext } from "../hooks";
import { PairwiseComparisonTable } from "./PairwiseComparisonTable";
import CriteriaManager from "./CriteriaManager";
import ScoringDisplay from "./ScoringDisplay";
import PrometheeDisplay from "./PrometheeDisplay";

const CriteriaDisplay = () => {
  const { criteria, companies, method } = useDataContext();
  const [showCompanyMatrices, setShowCompanyMatrices] = useState(false);

  const handleCriteriaMatrixCompletion = () => {
    setShowCompanyMatrices(true);
  };
  return (
    <section className="flex flex-col items-center gap-4">
      {method === "ahp" && !showCompanyMatrices && (
        <PairwiseComparisonTable
          items={criteria}
          type="criteria"
          onComplete={handleCriteriaMatrixCompletion}
        />
      )}

      {method === "ahp" && showCompanyMatrices && (
        <PairwiseComparisonTable items={companies} type="companies" />
      )}
      {method === "topsis" && <CriteriaManager />}
      {method === "WSM" && <ScoringDisplay />}
      {method === "promethee" && <PrometheeDisplay />}
    </section>
  );
};
export default CriteriaDisplay;
