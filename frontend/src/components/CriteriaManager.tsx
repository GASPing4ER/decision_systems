"use client";

import { useDataContext } from "@/hooks";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { getCriteriaName } from "@/lib/utils";

const CriteriaManager = () => {
  const { criteria, setCriteria, method } = useDataContext();

  const handleUpdate = (index: number, field: string, value: any) => {
    setCriteria((prev) =>
      prev.map((criterion, i) =>
        i === index ? { ...criterion, [field]: value } : criterion
      )
    );
  };

  return (
    <Table className="w-full border-collapse border border-gray-300">
      <TableBody>
        <TableRow>
          <TableCell className="border border-gray-300 p-2 text-left">
            Criterion
          </TableCell>
          <TableCell className="border border-gray-300 p-2 text-left">
            Weight
          </TableCell>
          {method === "promethee" && (
            <>
              <TableCell className="border border-gray-300 p-2 text-left">
                Indifference Threshold
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-left">
                Preference Threshold
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-left">
                Optimization
              </TableCell>
              <TableCell className="border border-gray-300 p-2 text-left">
                Preference Function
              </TableCell>
            </>
          )}
        </TableRow>
        {criteria.map((criterion, index) => (
          <TableRow key={index}>
            <TableCell className="border border-gray-300 p-2">
              {getCriteriaName(criterion.name)}
            </TableCell>
            <TableCell className="border border-gray-300 p-2">
              <input
                type="number"
                value={criterion.weight}
                min="0"
                step="0.01"
                className="w-full border bg-transparent rounded p-1"
                onChange={(e) =>
                  handleUpdate(index, "weight", parseFloat(e.target.value) || 0)
                }
              />
            </TableCell>
            {method === "promethee" && (
              <>
                <TableCell className="border border-gray-300 p-2">
                  <input
                    type="number"
                    value={criterion.indifferenceThreshold || ""}
                    min="0"
                    step="0.01"
                    className="w-full border bg-transparent rounded p-1"
                    placeholder="Enter indifference threshold"
                    onChange={(e) =>
                      handleUpdate(
                        index,
                        "indifferenceThreshold",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  <input
                    type="number"
                    value={criterion.preferenceThreshold || ""}
                    min="0"
                    step="0.01"
                    className="w-full border bg-transparent rounded p-1"
                    placeholder="Enter preference threshold"
                    onChange={(e) =>
                      handleUpdate(
                        index,
                        "preferenceThreshold",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  <select
                    value={criterion.optimization}
                    className="w-full border bg-transparent rounded p-1"
                    onChange={(e) =>
                      handleUpdate(
                        index,
                        "optimization",
                        parseInt(e.target.value)
                      )
                    }
                  >
                    <option value={1}>Maximize</option>
                    <option value={0}>Minimize</option>
                  </select>
                </TableCell>
                <TableCell className="border border-gray-300 p-2">
                  <select
                    value={criterion.preferenceFunction}
                    className="w-full border bg-transparent rounded p-1"
                    onChange={(e) =>
                      handleUpdate(index, "preferenceFunction", e.target.value)
                    }
                  >
                    <option value="li">Linear</option>
                    <option value="us">U-Shape</option>
                    <option value="vs">V-Shape</option>
                    <option value="le">Level</option>
                    <option value="g">Gaussian</option>
                  </select>
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CriteriaManager;
