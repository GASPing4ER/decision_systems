"use client";

import { useDataContext } from "../hooks";
import CompaniesTable from "./CompaniesTable";
import PhaseSwitchToButton from "./PhaseSwitchToButton";

const CompaniesDisplay = () => {
  const { phase, companies } = useDataContext();
  if (phase === "companies") {
    return (
      <section className="h-full flex flex-col items-center gap-4">
        <h1 className="text-2xl text-center py-4">
          CHOOSE COMPANIES TO COMPARE:
        </h1>
        <CompaniesTable />

        {companies && companies.length > 2 && (
          <PhaseSwitchToButton nextPhase="criteria" />
        )}
      </section>
    );
  }
};

export default CompaniesDisplay;
