import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CompanyRow from "./CompanyRow";
import { companies } from "@/constants";

const CompaniesTable = () => {
  return (
    <Table className="border">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Select</TableHead>
          <TableHead>Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Revenue ($M)</TableHead>
          <TableHead>Revenue Percent Change (%)</TableHead>
          <TableHead>Profits ($M)</TableHead>
          <TableHead>Profit Percent Change (%)</TableHead>
          <TableHead>Assets</TableHead>
          <TableHead>Employees</TableHead>
          <TableHead>Change in Rank</TableHead>
          <TableHead>Years on Global 500 List</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company) => (
          <CompanyRow key={company.id} company={company} />
        ))}
      </TableBody>
    </Table>
  );
};

export default CompaniesTable;
