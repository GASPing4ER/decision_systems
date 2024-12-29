import { ResultsTable } from "@/components";
import CompaniesDisplay from "@/components/CompaniesDisplay";
import CriteriaDisplay from "@/components/CriteriaDisplay";
import MethodsDisplay from "@/components/MethodsDisplay";

export default function Home() {
  return (
    <main className="h-screen mt-24 px-10">
      <CompaniesDisplay />
      <CriteriaDisplay />
      <MethodsDisplay />
      <ResultsTable />
    </main>
  );
}
