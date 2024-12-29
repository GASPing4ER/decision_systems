"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import { useDataContext } from "@/hooks";
import { CompanyProps } from "@/types";

type CompanyRowProps = {
  company: CompanyProps;
};

const CompanyRow = ({ company }: CompanyRowProps) => {
  const { handleAddCompany } = useDataContext();
  return (
    <TableRow className="h-14">
      <TableCell>
        <input type="checkbox" onChange={() => handleAddCompany(company)} />
      </TableCell>
      <TableCell className="font-medium">{company.rank}</TableCell>
      <TableCell>{company.name}</TableCell>
      <TableCell>{company.revenue}</TableCell>
      <TableCell>{company.revenuePercentChange}</TableCell>
      <TableCell>{company.profits}</TableCell>
      <TableCell>{company.profitsPercentChange}</TableCell>
      <TableCell>{company.assets}</TableCell>
      <TableCell>{company.employees}</TableCell>
      <TableCell>{company.changeInRank}</TableCell>
      <TableCell>{company.yearsOnGlobal500List}</TableCell>
    </TableRow>
  );
};

export default CompanyRow;
