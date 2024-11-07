"use client";

import { useRouter } from "next/navigation";
import BasicInfo from "../components/BasicInfo";
import InspectionResult from "../components/InspectionResult";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Pencil1Icon } from "@radix-ui/react-icons";
import useFetchInspectionById from "@/views/inspection/hooks/useFetchInspectionById";
import { LoaderCircle } from "lucide-react";

export default function InspectionResultByIdPage({ resultId }: { resultId: string }) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  const handleEdit = () => {
    router.push(`/inspection/result/${resultId}/edit`);
  };

  const { data: inspectionData, isFetching } = useFetchInspectionById(resultId);

  if (isFetching) {
    return (
      <div className="flex flex-col items-center gap-6 justify-center">
        <h1 className="text-3xl text-center font-bold">Inspection</h1>

        <LoaderCircle className="size-20 animate-spin" />
      </div>
    );
  }

  if (!inspectionData) {
    return <div>No Inspection Result Found</div>;
  }

  return (
    <div className="mt-2">
      <h1 className="text-3xl text-center font-bold">{inspectionData.name}</h1>

      <div className="flex md:gap-10 flex-col gap-6 mt-2 md:mt-6 md:flex-row">
        <div className="flex flex-col gap-2 w-3/4 mx-auto md:w-1/2">
          <img
            src={inspectionData.imageLink}
            alt={inspectionData.name}
            className="w-full h-auto rounded-lg"
          />
          <div className="flex space-x-4 justify-center md:justify-between mt-4">
            <Button variant={"outline"} onClick={handleBack}>
              <ArrowLeftIcon />
              Back
            </Button>
            <Button onClick={handleEdit}>
              <Pencil1Icon />
              Edit
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <BasicInfo resultData={inspectionData} />
          <InspectionResult resultData={inspectionData} />
        </div>
      </div>
    </div>
  );
}
