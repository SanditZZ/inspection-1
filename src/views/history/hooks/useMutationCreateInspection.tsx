import inspectionApi from "@/services/inspection";
import { useMutation } from "@tanstack/react-query";

export default function useMutationCreateInspection() {
  return useMutation({
    mutationFn: inspectionApi.createInspection,
  });
}
