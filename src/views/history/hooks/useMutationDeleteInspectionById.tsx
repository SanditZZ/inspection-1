import inspectionApi from "@/services/inspection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMutationDeleteInspectionById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inspectionId: string) =>
      inspectionApi.deleteInspectionById(inspectionId),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}
