import inspectionApi from "@/services/inspection";
import { UpdateInspectionRequest } from "@/services/inspection/types";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

export default function useMutationUpdateInspectionById(
  inspectionId: string,
  reqBody: UpdateInspectionRequest
): UseMutationResult<void, unknown, UpdateInspectionRequest, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => inspectionApi.updateInspectionById(inspectionId, reqBody),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
      queryClient.invalidateQueries({
        queryKey: ["history", `${inspectionId}`],
      });
    },
  });
}
