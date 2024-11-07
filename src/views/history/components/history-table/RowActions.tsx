import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InspectionResponse } from "@/services/inspection/types";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import useMutationDeleteInspectionById from "@/views/history/hooks/useMutationDeleteInspectionById";

export default function RowActions({ row }: { row: Row<InspectionResponse> }) {
  const inspection = row.original;
  const router = useRouter();

  const handleViewClick = (inspectionId: string) => {
    router.push(`/inspection/result/${inspectionId}`);
  };

  const { mutate: deleteInspectionById } = useMutationDeleteInspectionById();

  const handleDeleteClick = async (inspectionId: string) => {
    await deleteInspectionById(inspectionId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleViewClick(inspection.inspectionID)}
        >
          View Inspection
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDeleteClick(inspection.inspectionID)}
          className="text-red-500"
        >
          Delete Inspection
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
