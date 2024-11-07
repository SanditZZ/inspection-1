"use client";

import standardApi from "@/services/standard";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Standard } from "@/lib/history/types";

export default function useFetchStandards(): UseQueryResult<Standard[]> {
  return useQuery({
    queryKey: ["standards"],
    queryFn: async () => {
      const standardResp = await standardApi.getStandards();
      return standardResp;
    },
  });
}
