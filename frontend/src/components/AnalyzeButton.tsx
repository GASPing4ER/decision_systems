"use client";

import { useDataContext } from "../hooks";

const AnalyzeButton = () => {
  const { criteria, setResults } = useDataContext();

  const { companies } = useDataContext();
  const isDisabled = !(companies.length !== 0 && criteria.length !== 0);
  const analyze = async () => {
    const response = await fetch("/api/topsis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companies, criteria }),
    });
    const data = await response.json();
    console.log(data);
    setResults(data);
  };

  return (
    <button
      className="mt-4 bg-black py-2 px-4 text-white rounded-2xl disabled:bg-black/50"
      onClick={analyze}
      disabled={isDisabled}
    >
      Analyze
    </button>
  );
};

export default AnalyzeButton;
