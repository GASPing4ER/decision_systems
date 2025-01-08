import { getResults } from "@/actions/results";
import Link from "next/link";

const ArchivePage = async () => {
  const { data: results } = await getResults();
  console.log(results);
  return (
    <div className="w-full h-screen flex flex-col gap-6 p-6 pt-24 lg:p-24 bg-slate-50 text-slate-900">
      <h1 className="text-2xl">ARCHIVE</h1>
      <div className="flex gap-10">
        {results &&
          results.map((result) => (
            <Link
              href={`/archive/${result.id}`}
              className="w-[250px] h-[100px] flex justify-center items-center text-center border border-black rounded-2xl"
              key={result.id}
            >
              <h2>{result.name}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ArchivePage;
