"use client";

import { useDataContext } from "@/hooks";
import { getCriteriaName } from "@/lib/utils";
import Link from "next/link";

const ResultOverview = () => {
  const { companies, criteria, method } = useDataContext();
  return (
    <div className="flex justify-between px-4 lg:px-10 mb-4 overflow-y-scroll">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">CHOSEN METHOD:</h2>
        <p className="uppercase">{method}</p>
        <h2 className="text-lg font-semibold">CHOSEN COMPANIES:</h2>
        <div>
          {companies.map((company) => (
            <p key={company.id}>{company.name}</p>
          ))}
        </div>
        <h2 className="text-lg font-semibold">CHOSEN CRITERIA:</h2>
        <div>
          {criteria.map((criterion) => (
            <p key={criterion.name}>{getCriteriaName(criterion.name)}</p>
          ))}
        </div>
      </div>
      <Link
        className="self-end bg-[#091235] text-white py-2 px-4 rounded-full"
        href="/results"
      >
        See results
      </Link>
    </div>
  );
};

export default ResultOverview;
