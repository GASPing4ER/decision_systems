import CriteriaRow from "./CriteriaRow";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { availableCriteria } from "@/constants";

const CriteriaTable = () => {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Select</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {availableCriteria.map((criteria) => (
          <CriteriaRow key={criteria.slug} criterion={criteria} />
        ))}
      </TableBody>
    </Table>
  );
};

export default CriteriaTable;
