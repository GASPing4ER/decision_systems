export type CompanyProps = {
  id: string;
  rank: number;
  name: string;
  revenue: string;
  revenuePercentChange: string;
  profits: string;
  profitsPercentChange: string;
  assets: string;
  employees: string;
  changeInRank: string;
  yearsOnGlobal500List: string;
};

export type CriteriaProps = {
  name: string;
  weight: number;
};

export type ResultProps = {
  name: string;
  score: number;
};

export type PhaseProps = "companies" | "criteria" | "methods" | "results";

export type MethodProps = "ahp" | "topsis" | "scoring" | "";
