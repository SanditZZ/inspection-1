"use client";

import EditInspectionForm from "@/views/inspection/components/EditInspectionForm";
import useFetchInspectionById from "@/views/inspection/hooks/useFetchInspectionById";

export default function EditInspectionResultByIdPage({
  resultId,
}: {
  resultId: string;
}) {
  const { data: inspectionData } = useFetchInspectionById(resultId);

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Edit Inspection</h1>

      <EditInspectionForm initialData={inspectionData} resultId={resultId} />
    </div>
  );
}
