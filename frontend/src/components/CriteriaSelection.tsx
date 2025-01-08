"use client";

import { availableCriteria } from "../constants";
import { useDataContext } from "../hooks";
import { CriteriaProps } from "../types";
import { useEffect, useState } from "react";

const CriteriaSelection = () => {
  const [totalWeight, setTotalWeight] = useState(0);
  const { criteria, setCriteria, method } = useDataContext();
  useEffect(() => {
    // Calculate the total weight sum whenever criteria change
    const sum = criteria.reduce((acc, curr) => acc + curr.weight, 0);
    setTotalWeight(sum);
  }, [criteria]);

  const addCriterion = () => {
    setCriteria([...criteria, { name: "", weight: 0 }]);
  };

  const updateCriterion = (index: number, updatedCriterion: CriteriaProps) => {
    setCriteria((prevCriteria) => {
      const newCriteria = [...prevCriteria];
      newCriteria[index] = updatedCriterion;
      return newCriteria;
    });
  };

  const removeCriterion = (index: number) => {
    setCriteria((prevCriteria) => prevCriteria.filter((_, i) => i !== index));
  };

  const getAvailableOptions = (selectedName: string) => {
    return availableCriteria.filter(
      (option) =>
        !criteria.some(
          (criterion) =>
            criterion.name === option && criterion.name !== selectedName
        )
    );
  };

  return (
    <div>
      {criteria.map((criterion, index) => (
        <div key={index} className="criteria-row flex items-center gap-2 mb-2">
          {/* Dropdown for selecting criterion name */}
          <select
            value={criterion.name}
            onChange={(e) =>
              updateCriterion(index, { ...criterion, name: e.target.value })
            }
            className="border p-1"
          >
            {/* Placeholder option */}
            <option value="" disabled>
              Select criterion
            </option>
            {getAvailableOptions(criterion.name).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Input for weight */}
          {method !== "ahp" && (
            <input
              type="number"
              placeholder="Weight"
              min="0"
              max="1"
              step="0.01"
              value={criterion.weight}
              onChange={(e) => {
                const weight = parseFloat(e.target.value);
                if (!isNaN(weight)) {
                  updateCriterion(index, { ...criterion, weight });
                }
              }}
              className="border p-1 w-16"
            />
          )}

          {/* Remove button */}
          <button
            onClick={() => removeCriterion(index)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      {/* Display warning if the total weight is not 1 */}
      {totalWeight !== 1 && method !== "ahp" && (
        <div className="text-red-500 mt-2">
          The total weight must equal 1. Current total: {totalWeight.toFixed(2)}
        </div>
      )}
      {/* Button to add a new criterion row */}
      <button
        onClick={addCriterion}
        className="mt-4 p-2 bg-blue-500 text-white"
      >
        Add Criterion
      </button>
    </div>
  );
};

export default CriteriaSelection;
