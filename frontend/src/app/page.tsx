import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default  function TableData() {
  const [data, setData] = useState<Payment[]>([])
  
  useEffect(()=> {
    getData().then(payment=> setData(payment))
  },[data])
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
