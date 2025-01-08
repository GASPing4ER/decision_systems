import { getResult } from "@/actions/results";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResultProps } from "@/types";
import Chart from "@/components/Chart";

const ArchiveDetailsPage = async (props: {
  params: Promise<{ archiveId: string }>;
}) => {
  const params = await props.params;
  const archiveId = params.archiveId;
  const { data } = await getResult(archiveId);
  const method = data.name.split(":")[0];
  const y_axis =
    method === "TOPSIS"
      ? "closeness_coefficient"
      : method === "AHP"
      ? "global_priorities"
      : method === "WSM"
      ? "weighted_sum"
      : "score";
  return (
    <section className="h-full w-full p-24 flex flex-col flex-wrap items-center gap-4">
      <h1>{data.name}</h1>
      {data && data.results.results.length > 0 ? (
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
              {data.results.results.map(
                (result: ResultProps, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{result.name}</TableCell>
                    <TableCell>
                      {method === "TOPSIS"
                        ? result.closeness_coefficient?.toFixed(2)
                        : method === "AHP"
                        ? result.global_priorities?.toFixed(2)
                        : method === "WSM"
                        ? result.weighted_sum?.toFixed(2)
                        : result.score?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
          <Chart data={data.results.results} y_axis={y_axis} />
        </>
      ) : (
        <h1 className="text-2xl text-center text-black">NO RESULTS!</h1>
      )}
    </section>
  );
};
export default ArchiveDetailsPage;
