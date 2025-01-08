"use client";

import { useDataContext } from "@/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormEvent, useEffect } from "react";
import { ResultProps } from "@/types";
import { addResult } from "@/actions/results";
import Chart from "@/components/Chart";

const ResultsPage = () => {
  const {
    results,
    setResults,
    method,
    companies,
    setCompanies,
    criteria,
    setCriteria,
    pairwiseMatrixes,
    setPairwiseMatrixes,
    scores,
    setScores,
  } = useDataContext();

  useEffect(() => {
    const fetchResults = async () => {
      setResults([]);
      try {
        let endpoint = "";
        let body = {};

        if (method === "topsis") {
          endpoint = "http://127.0.0.1:8000/api/methods/topsis";
          body = { companies, criteria };
        } else if (method === "ahp") {
          endpoint = "http://127.0.0.1:8000/api/methods/ahp";
          body = { companies, criteria, matrixes: pairwiseMatrixes };
        } else if (method === "WSM") {
          endpoint = "http://127.0.0.1:8000/api/methods/wsm";
          body = { companies, criteria, scores };
        } else {
          endpoint = "http://127.0.0.1:8000/api/methods/promethee";
          body = { companies, criteria, scores };
        }

        if (!endpoint) return;

        console.log("Sending request:", body);

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch: ${response.statusText}\n${errorText}`
          );
        }

        const data = await response.json();
        console.log("Received data:", data);

        const sortedData: ResultProps[] =
          method === "WSM" || "promethee"
            ? data.results
            : data.results.sort((a: ResultProps, b: ResultProps) => {
                return method === "topsis"
                  ? b.closeness_coefficient! - a.closeness_coefficient!
                  : b.global_priorities! - a.global_priorities!;
              });

        setResults(sortedData);
        setCompanies([]);
        setCriteria([]);
        setPairwiseMatrixes([]);
        setScores([]);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    if (method && companies.length > 0 && criteria.length > 0) {
      fetchResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies, criteria, method]);

  const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = `${method.toUpperCase()}: ${Date.now()}`;
    const { error } = await addResult(name, { results });
    console.log("Add Result error:", error);
  };

  const y_axis =
    method === "topsis"
      ? "closeness_coefficient"
      : method === "ahp"
      ? "global_priorities"
      : method === "WSM"
      ? "weighted_sum"
      : "score";

  return (
    <section className="h-full p-24 flex flex-col items-center gap-4">
      {results && results.length > 0 ? (
        <>
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
                  <TableCell>
                    {method === "topsis"
                      ? result.closeness_coefficient?.toFixed(2)
                      : method === "ahp"
                      ? result.global_priorities?.toFixed(2)
                      : method === "WSM"
                      ? result.weighted_sum?.toFixed(2)
                      : result.score?.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Chart data={results} y_axis={y_axis} />

          <form onSubmit={onHandleSubmit}>
            <button className="bg-[#091235] text-white px-4 py-2 rounded-full">
              Save results
            </button>
          </form>
        </>
      ) : (
        <h1 className="text-2xl text-center text-black">NO RESULTS!</h1>
      )}
    </section>
  );
};

export default ResultsPage;
