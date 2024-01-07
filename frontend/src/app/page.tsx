import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useAtomValue } from "jotai";
import { pageAtom } from "@/atoms/pagination";
import { useQuery } from "react-query";
import { getFakeData } from "@/api/fakedata";
import { Button } from "@/components/ui/button";

export default function TableData() {
  const currentPage = useAtomValue(pageAtom);
  const tweetsQuery = useQuery({
    queryKey: ["tweets", currentPage],
    queryFn: () => getFakeData(currentPage),
    initialData: [],
    enabled: false,
  });

  if (tweetsQuery.isLoading) return <h1>Loading...</h1>;
  if (tweetsQuery.isError)
    return <pre>{JSON.stringify(tweetsQuery.error)}</pre>;

  const handleClick = () => {
    tweetsQuery.refetch();
  };

  return (
    <>
      <Button variant="outline" onClick={handleClick}>
        Generate Tweet
      </Button>
      <div className="container mx-auto py-10 px-0">
        {tweetsQuery.data && (
          <DataTable columns={columns} data={tweetsQuery.data} />
        )}
      </div>
    </>
  );
}
