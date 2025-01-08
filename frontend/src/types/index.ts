export type CompanyProps = {
  id: string;
  rank: number;
  name: string;
  revenue: number;
  revenue_percent_change: number;
  profits: number;
  profits_percent_change: number;
  assets: number;
  employees: number;
  change_in_rank: number;
  years_on_global_500_list: number;
};

export type CriteriaProps = {
  name: string;
  weight: number;
  indifferenceThreshold: number;
  preferenceThreshold: number;
  optimization: number;
  preferenceFunction: string;
};

export type ResultProps = {
  id: string;
  name: string;
  closeness_coefficient?: number;
  global_priorities?: number;
  weighted_sum?: number;
  score?: number;
};

export type PhaseProps = "companies" | "criteria" | "methods" | "results";

export type MethodProps = "ahp" | "topsis" | "WSM" | "promethee" | "";

export type MatrixProps = number[][];
