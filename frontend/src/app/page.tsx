import { Tweet } from "@/types/tweet"
import {columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react"
import { useAtomValue } from "jotai"
import { pageAtom } from "@/atoms/pagination"
import { useQuery } from "react-query"
import { getFakeData } from "@/api/fakedata"

export default  function TableData() {
    const currentPage = useAtomValue(pageAtom);
    const tweetsQuery = useQuery({
      queryKey: ["tweets", currentPage],initialData:[],
      queryFn: () => getFakeData(currentPage),
    });
  
    if (tweetsQuery.isLoading) return <h1>Loading...</h1>;
    if (tweetsQuery.isError)
      return <pre>{JSON.stringify(tweetsQuery.error)}</pre>;
  
  return (
    
    <div className="container mx-auto py-10">
      {tweetsQuery.data && <DataTable columns={columns} data={tweetsQuery.data}/>}
    </div>
  )
}

