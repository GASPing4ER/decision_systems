"use client";

import { TableRow, TableCell } from "./ui/table";
import { useDataContext } from "../hooks";

type CriteriaRowProps = {
  criterion: {
    slug: string;
    title: string;
  };
};

const CriteriaRow = ({ criterion }: CriteriaRowProps) => {
  const { setCriteria, criteria } = useDataContext();

  const isChecked = criteria.some((c) => c.name === criterion.slug);

  const handleSelectCriterion = () => {
    if (isChecked) {
      setCriteria((prev) =>
        prev.filter((criteria) => criteria.name !== criterion.slug)
      );
    } else {
      const defaultCriterion = {
        name: criterion.slug,
        weight: 0, // Default weight
        indifferenceThreshold: 0.1, // Default indifference threshold
        preferenceThreshold: 0.2, // Default preference threshold
        optimization: 1, // Default optimization (1 = maximize)
        preferenceFunction: "li", // Default preference function (linear)
      };

      setCriteria((prev) => [...prev, defaultCriterion]);
    }
  };

  return (
    <TableRow className="h-14">
      <TableCell>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleSelectCriterion()}
        />
      </TableCell>
      <TableCell>{criterion.title}</TableCell>
    </TableRow>
  );
};

export default CriteriaRow;
