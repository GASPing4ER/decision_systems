"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Input } from "./ui/input";
import { useDataContext } from "../hooks";
import { CompanyProps, CriteriaProps, MatrixProps } from "@/types";
import { getCriteriaName } from "@/lib/utils";

export const PairwiseComparisonTable = ({
  items,
  type,
  onComplete,
}: {
  items: CompanyProps[] | CriteriaProps[];
  type: "criteria" | "companies";
  onComplete?: () => void;
}) => {
  const { pairwiseMatrixes, setPairwiseMatrixes, criteria } = useDataContext();
  const [currentMatrixIndex, setCurrentMatrixIndex] = useState(0);
  const [matrix, setMatrix] = useState<number[][]>([]);

  // Initialize matrix based on items
  useEffect(() => {
    const initializeMatrix: MatrixProps = Array(items.length)
      .fill(null)
      .map((_, rowIndex) =>
        Array(items.length)
          .fill(1)
          .map((_, colIndex) => (rowIndex === colIndex ? 1 : 1))
      );
    setMatrix(initializeMatrix);
  }, [items]);

  const handleInputChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newValue = parseFloat(value) || 1;
    const updatedMatrix = [...matrix];
    updatedMatrix[rowIndex][colIndex] = newValue;
    updatedMatrix[colIndex][rowIndex] = 1 / newValue; // Maintain reciprocal relationship
    setMatrix(updatedMatrix);
  };

  const handleSaveMatrix = () => {
    // const newMatrixEntry = {
    //   type,
    //   index: currentMatrixIndex,
    //   matrix,
    //   criteriaName:
    //     type === "companies" ? criteria[currentMatrixIndex].name : undefined,
    // };

    setPairwiseMatrixes((prev) => [...prev, matrix]);

    if (type === "criteria") {
      onComplete?.();
    } else if (
      type === "companies" &&
      currentMatrixIndex < criteria.length - 1
    ) {
      setCurrentMatrixIndex((prevIndex) => prevIndex + 1);
    }
  };

  const isLastMatrix =
    type === "companies" && currentMatrixIndex === criteria.length - 1;

  return (
    <>
      <h2 className="text-xl text-center py-4">
        {type === "criteria"
          ? "Criteria"
          : `Companies - ${getCriteriaName(
              criteria[currentMatrixIndex]?.name
            )}`}
      </h2>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell />
            {items.map((item, index) => (
              <TableCell key={`header-${index}`} className="text-center">
                {type === "criteria" ? getCriteriaName(item.name) : item.name}
              </TableCell>
            ))}
          </TableRow>
          {items.map((rowItem, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              <TableCell className="text-center">
                {type === "criteria"
                  ? getCriteriaName(rowItem.name)
                  : rowItem.name}
              </TableCell>
              {items.map((colItem, colIndex) => (
                <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                  {rowIndex === colIndex ? (
                    1
                  ) : (
                    <Input
                      value={matrix[rowIndex]?.[colIndex] || ""}
                      type="number"
                      onChange={(e) =>
                        handleInputChange(rowIndex, colIndex, e.target.value)
                      }
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center py-4">
        {pairwiseMatrixes.length !== criteria.length + 1 && (
          <button onClick={handleSaveMatrix} className="btn-primary">
            {isLastMatrix ? "Finish" : "Next"}
          </button>
        )}
      </div>
    </>
  );
};
