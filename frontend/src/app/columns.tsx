"use client";

import { Tweet } from "@/types/tweet";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Tweet>[] = [
  {
    accessorKey: "name",
    header: () => <div style={{ textAlign: "left" }}>Name</div>,
    // header: "Name",
  },
  {
    accessorKey: "tweet",
    header: () => <div style={{ textAlign: "left" }}>Tweet</div>,
    // header: "Tweet",
  },
  // {
  //   accessorKey: "amount",
  //   header: "Amount",
  // },
];
