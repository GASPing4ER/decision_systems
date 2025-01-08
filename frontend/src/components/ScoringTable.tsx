"use client";

import { useEffect } from "react";
import { useDataContext } from "@/hooks";
import { getCriteriaName } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

const ScoringTable = () => {
  const { criteria, companies, scores, setScores } = useDataContext();

  // Initialize scores state only once or when dimensions change
  useEffect(() => {
    if (
      scores.length !== companies.length || // Check row count
      (scores[0]?.length || 0) !== criteria.length // Check column count
    ) {
      const newScores = Array(companies.length)
        .fill(0)
        .map(() => Array(criteria.length).fill(0));
      setScores(newScores);
    }
  }, [companies.length, criteria.length, scores, setScores]);

  // Handle score change for a specific cell
  const handleScoreChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newScores = scores.map((row, i) =>
      row.map((score, j) =>
        i === rowIndex && j === colIndex ? parseFloat(value) || 0 : score
      )
    );
    setScores(newScores);
  };

  // Guard against undefined `scores` and ensure rendering waits for initialization
  if (
    scores.length !== companies.length ||
    (scores[0]?.length || 0) !== criteria.length
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table className="w-full border-collapse border border-gray-300">
        <TableBody>
          <TableRow>
            <TableCell className="border border-gray-300 p-2 text-left">
              Companies / Criteria
            </TableCell>
            {criteria.map((criterion, index) => (
              <TableCell
                className="border border-gray-300 p-2 text-left"
                key={index}
              >
                {getCriteriaName(criterion.name)}
              </TableCell>
            ))}
          </TableRow>
          {companies.map((company, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell className="border border-gray-300 p-2 text-left">
                {company.name}
              </TableCell>
              {criteria.map((_, colIndex) => (
                <TableCell
                  className="border border-gray-300 p-2 text-left"
                  key={colIndex}
                >
                  <input
                    type="number"
                    className="w-full border bg-transparent rounded p-1"
                    value={scores[rowIndex]?.[colIndex] || 0}
                    onChange={(e) =>
                      handleScoreChange(rowIndex, colIndex, e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScoringTable;
