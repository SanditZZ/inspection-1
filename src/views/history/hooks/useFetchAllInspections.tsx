"use client";

import inspectionApi from "@/services/inspection";
import { InspectionResponse } from "@/services/inspection/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export default function useFetchAllInspections(
  inspectionID?: string,
): UseQueryResult<InspectionResponse[]> {
  return useQuery({
    queryKey: ["history", inspectionID],
    queryFn: async () => {
      const historyResp = await inspectionApi.getAllInspections(inspectionID);
      return historyResp.length ? historyResp : [];
    },
    enabled: inspectionID !== undefined,
  });
}
