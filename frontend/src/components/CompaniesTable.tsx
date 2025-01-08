import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import CompanyRow from "./CompanyRow";
import { CompanyProps } from "@/types";

const CompaniesTable = ({ companies }: { companies: CompanyProps[] }) => {
  return (
    <Table className="border">
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
          {/* <TableHead>Change in Rank</TableHead> */}
          {/* <TableHead>Years on Global 500 List</TableHead> */}
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
