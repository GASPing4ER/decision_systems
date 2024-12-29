"use client";

import { useDataContext } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const ResultsTable = () => {
  const { results, phase } = useDataContext();
  console.log(results);
  if (results && results.length > 0 && phase === "results") {
    return (
      <section className="h-full flex flex-col items-center gap-4">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{result.name}</TableCell>
                <TableCell>{result.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    );
  } else {
    return (
      <section className="h-full flex flex-col items-center gap-4">
        <h1 className="text-2xl text-center py-4">NO RESULTS!</h1>
      </section>
    );
  }
};

export default ResultsTable;
