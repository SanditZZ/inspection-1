"use client";

import InspectionResultByIdPage from "@/views/inspection/pages/InspectionResultByIdPage";

export default function InspectionResultById({
  params,
}: {
  params: { rid: string };
}) {
  const { rid } = params;
  return <InspectionResultByIdPage resultId={rid} />;
}
