import { availableCriteria } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCriteriaName(slug: string) {
  const criteriaData = availableCriteria.find(
    (criteria) => criteria.slug === slug
  );

  return criteriaData?.title;
}
