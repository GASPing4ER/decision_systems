// lib/topsis.ts

export function cleanCurrency(value: string): number {
  // Remove dollar sign and commas
  const cleanedValue = value.replace(/[\$,]/g, "");
  const returnValue = parseFloat(cleanedValue);
  return Number.isNaN(returnValue) ? 0 : returnValue;
}

export function normalizeDecisionMatrix(matrix: number[][]): number[][] {
  const columnsCount = matrix[0].length;
  const normalizedMatrix: number[][] = [];
  for (let i = 0; i < matrix.length; i++) {
    normalizedMatrix.push([]);
    for (let j = 0; j < columnsCount; j++) {
      let columnSum = 0;
      for (let k = 0; k < matrix.length; k++) {
        columnSum += matrix[k][j] ** 2;
      }
      normalizedMatrix[i][j] = matrix[i][j] / Math.sqrt(columnSum);
    }
  }
  return normalizedMatrix;
}

export function weightedNormalizedMatrix(
  normalizedMatrix: number[][],
  weights: number[]
): number[][] {
  return normalizedMatrix.map((row) =>
    row.map((value, index) => value * weights[index])
  );
}

export function calculateIdealSolutions(
  weightedMatrix: number[][],
  isBenefitCriteria: boolean[]
) {
  const idealSolution = [];
  const antiIdealSolution = [];

  for (let j = 0; j < weightedMatrix[0].length; j++) {
    const columnValues = weightedMatrix.map((row) => row[j]);
    const ideal = isBenefitCriteria[j]
      ? Math.max(...columnValues)
      : Math.min(...columnValues);
    const antiIdeal = isBenefitCriteria[j]
      ? Math.min(...columnValues)
      : Math.max(...columnValues);
    idealSolution.push(ideal);
    antiIdealSolution.push(antiIdeal);
  }
  return { idealSolution, antiIdealSolution };
}

export function calculateDistances(
  weightedMatrix: number[][],
  idealSolution: number[],
  antiIdealSolution: number[]
) {
  const distances: { toIdeal: number; toAntiIdeal: number }[] = [];
  for (let i = 0; i < weightedMatrix.length; i++) {
    let distanceToIdeal = 0;
    let distanceToAntiIdeal = 0;
    for (let j = 0; j < weightedMatrix[i].length; j++) {
      distanceToIdeal += (weightedMatrix[i][j] - idealSolution[j]) ** 2;
      distanceToAntiIdeal += (weightedMatrix[i][j] - antiIdealSolution[j]) ** 2;
    }
    distances.push({
      toIdeal: Math.sqrt(distanceToIdeal),
      toAntiIdeal: Math.sqrt(distanceToAntiIdeal),
    });
  }
  return distances;
}

export function calculateCloseness(
  distances: { toIdeal: number; toAntiIdeal: number }[]
): number[] {
  return distances.map(
    (dist) => dist.toAntiIdeal / (dist.toIdeal + dist.toAntiIdeal)
  );
}
