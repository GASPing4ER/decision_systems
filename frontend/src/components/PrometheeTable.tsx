"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Input } from "./ui/input";
import { useDataContext } from "../hooks";
import { CompanyProps, CriteriaProps, MatrixProps } from "@/types";
import { getCriteriaName } from "@/lib/utils";

export const PrometheeTable = ({
  companies,
  criteria,
}: {
  companies: CompanyProps[];
  criteria: CriteriaProps[];
}) => {
  const { pairwiseMatrixes, setPairwiseMatrixes } = useDataContext();
  const [currentMatrixIndex, setCurrentMatrixIndex] = useState(0);
  const [matrix, setMatrix] = useState<number[][]>([]);
  console.log("criteria:", criteria);
  console.log("pairwisematrix:", pairwiseMatrixes);

  // Initialize matrix based on items
  useEffect(() => {
    const initializeMatrix: MatrixProps = Array(companies.length)
      .fill(null)
      .map((_, rowIndex) =>
        Array(criteria.length)
          .fill(1)
          .map((_, colIndex) => 1)
      );
    setMatrix(initializeMatrix);
  }, [companies, criteria]);

  const handleInputChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newValue = parseFloat(value) || 1;
    const updatedMatrix = [...matrix];
    updatedMatrix[rowIndex][colIndex] = newValue;
    setMatrix(updatedMatrix);
  };

  const isLastMatrix = currentMatrixIndex === criteria.length - 1;

  const handleSaveMatrix = () => {
    setPairwiseMatrixes((prev) => [...prev, matrix]);

    if (currentMatrixIndex < criteria.length - 1) {
      setCurrentMatrixIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      <h2 className="text-xl text-center py-4">
        {`Companies - ${getCriteriaName(criteria[currentMatrixIndex]?.name)}`}
      </h2>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell />
            {criteria.map((item, index) => (
              <TableCell key={`header-${index}`} className="text-center">
                {getCriteriaName(item.name)}
              </TableCell>
            ))}
          </TableRow>
          {companies.map((rowItem, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              <TableCell className="text-center">{rowItem.name}</TableCell>
              {criteria.map((colItem, colIndex) => (
                <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                  <Input
                    value={matrix[rowIndex]?.[colIndex] || ""}
                    type="number"
                    onChange={(e) =>
                      handleInputChange(rowIndex, colIndex, e.target.value)
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center py-4">
        {pairwiseMatrixes.length !== criteria.length && (
          <button onClick={handleSaveMatrix} className="btn-primary">
            {isLastMatrix ? "Finish" : "Next"}
          </button>
        )}
      </div>
    </>
  );
};
