"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { InspectionResponse } from "@/services/inspection/types";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "./RowActions";
import { format } from "date-fns";

export const columns: ColumnDef<InspectionResponse>[] = [
  {
    id: "select",
    // header: ({ table }) => (
    //   <Checkbox
    //     className="flex"
    //     checked={
    //       table.getIsAllPageRowsSelected() ||
    //       (table.getIsSomePageRowsSelected() && "indeterminate")
    //     }
    //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //     aria-label="Select all"
    //   />
    // ),
    cell: ({ row }) => (
      <Checkbox
        className="flex"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createDate",
    header: "Create Date - Time",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createDate"));
      const formattedDate = format(date, "dd/MM/yyyy, HH:mm:ss");
      return formattedDate;
    },
  },
  {
    accessorKey: "inspectionID",
    header: "Inspection ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "standardName",
    header: "Standard",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row} />,
  },
];
