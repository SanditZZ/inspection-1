"use client";

import inspectionApi from "@/services/inspection";
import { InspectionByIdResponse } from "@/services/inspection/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export default function useFetchInspectionById(
  inspectionId: string,
): UseQueryResult<InspectionByIdResponse> {
  return useQuery({
    queryKey: ["inspection", `${inspectionId}`],
    queryFn: async () => {
      const inspectionResp = await inspectionApi.getInspectionById(inspectionId);
      return inspectionResp;
    },
    refetchOnWindowFocus: false,
    enabled: !!inspectionId,
  });
}
