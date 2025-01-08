"use client";

import { TableRow, TableCell } from "./ui/table";
import { useDataContext } from "../hooks";
import { CompanyProps } from "../types";

type CompanyRowProps = {
  company: CompanyProps;
};

const CompanyRow = ({ company }: CompanyRowProps) => {
  const { handleAddCompany, companies } = useDataContext();

  const isChecked = companies.some((c) => c.id === company.id);

  return (
    <TableRow className="h-14">
      <TableCell>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleAddCompany(company)}
        />
      </TableCell>
      <TableCell className="font-medium">{company.rank}</TableCell>
      <TableCell>{company.name}</TableCell>
      <TableCell>{company.revenue}</TableCell>
      <TableCell>{company.revenue_percent_change}</TableCell>
      <TableCell>{company.profits}</TableCell>
      <TableCell>{company.profits_percent_change}</TableCell>
      <TableCell>{company.assets}</TableCell>
      <TableCell>{company.employees}</TableCell>
      {/* <TableCell>{company.change_in_rank}</TableCell> */}
      {/* <TableCell>{company.years_on_global_500_list}</TableCell> */}
    </TableRow>
  );
};

export default CompanyRow;
