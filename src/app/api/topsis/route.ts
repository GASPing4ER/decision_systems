// app/api/topsis/route.ts
import { NextResponse } from "next/server";
import {
  normalizeDecisionMatrix,
  weightedNormalizedMatrix,
  calculateIdealSolutions,
  calculateDistances,
  calculateCloseness,
  cleanCurrency,
} from "@/lib/topsis";
import { CompanyProps, CriteriaProps } from "@/types";

export async function POST(req: Request) {
  const { companies, criteria } = await req.json();
  console.log(companies, criteria);

  // Step 1: Filter active criteria (criteria with positive weight)
  const activeCriteria = criteria.filter(
    (criterion: CriteriaProps) => criterion.weight > 0
  );

  // Step 2: Create the decision matrix using only active criteria
  const decisionMatrix = companies.map((company: CompanyProps) => {
    return activeCriteria.map((criterion: CriteriaProps) => {
      const rawValue = company[criterion.name] || "0";
      return cleanCurrency(rawValue);
    });
  });

  console.log("decision matrix:", decisionMatrix);

  //   Convert companies data to decision matrix

  const weights = criteria.map((criterion: CriteriaProps) => criterion.weight);
  const isBenefitCriteria = criteria.map(
    (criterion: CriteriaProps) => criterion.weight > 0
  );

  // Step 1: Normalize the decision matrix
  const normalizedMatrix = normalizeDecisionMatrix(decisionMatrix);

  // Step 2: Multiply by weights to get weighted normalized matrix
  const weightedMatrix = weightedNormalizedMatrix(normalizedMatrix, weights);

  // Step 3: Calculate ideal and anti-ideal solutions
  const { idealSolution, antiIdealSolution } = calculateIdealSolutions(
    weightedMatrix,
    isBenefitCriteria
  );

  // Step 4: Calculate distances to ideal and anti-ideal solutions
  const distances = calculateDistances(
    weightedMatrix,
    idealSolution,
    antiIdealSolution
  );

  // Step 5: Calculate closeness coefficient
  const closeness = calculateCloseness(distances);

  // Rank companies based on closeness coefficient
  const rankedCompanies = companies
    .map((company: CompanyProps, index: number) => ({
      name: company.name,
      score: closeness[index],
    }))
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score);

  return NextResponse.json(rankedCompanies);
}
