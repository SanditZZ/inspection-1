"use client";

import EditInspectionResultByIdPage from "@/views/inspection/pages/EditInspectionResultByIdPage";

export default function EditInspectionResultById({
  params,
}: {
  params: { rid: string };
}) {
  const { rid } = params;

  if (!rid) return null;

  return <EditInspectionResultByIdPage resultId={rid} />;
}
