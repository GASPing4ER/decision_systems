import { getCompanies } from "@/actions/companies";
import ServicesContainer from "@/components/ServicesContainer";

export default async function Home() {
  const companiesResponse = await getCompanies();
  const companies = companiesResponse.data;

  return (
    <main>
      <ServicesContainer companies={companies ? companies : []} />
    </main>
  );
}
