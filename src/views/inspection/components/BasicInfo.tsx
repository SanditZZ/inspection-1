import { InspectionResponse } from "@/services/inspection/types";
import { format } from "date-fns";

export default function BasicInfo({ resultData }: { resultData: InspectionResponse }) {
  return (
    <div className="bg-white rounded-lg border shadow-md px-6 py-6">
      <h2 className="text-2xl mb-2 font-semibold">Basic Information</h2>

      <div className="grid grid-cols-2 text-base gap-y-2 text-gray-800">
        <div className="flex flex-col">
          <p className="text-gray-500">Create Date (Time):</p>
          <p>
            {format(new Date(resultData.createDate), "dd/MM/yyyy, HH:mm:ss") || "N/A"}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500">Inspection ID:</p>
          <p>{resultData.inspectionID || "N/A"}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500">Standard:</p>
          <p>{resultData.standardName || "N/A"}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500">Total Sample:</p>
          <p>{resultData.standardData?.totalSample || "N/A"}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500">Update Date (Time):</p>
          <p>
            {format(new Date(resultData.createDate), "dd/MM/yyyy, HH:mm:ss") || "N/A"}
          </p>
        </div>
      </div>
      <hr className="my-4 border-[0.5px]" />
      <div className="grid grid-cols-2 text-base gap-y-2 text-gray-800">
        <div className="flex flex-col">
          <p className="text-gray-500">Note:</p>
          <p>{resultData.note || "N/A"}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500">Price:</p>
          <p>{resultData.price || "N/A"}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500">Date/Time of Sampling:</p>
          <p>
            {resultData.samplingDateTime
              ? format(new Date(resultData.samplingDateTime), "dd/MM/yyyy, HH:mm:ss")
              : "N/A"}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500">Sampling Point:</p>
          <p className="capitalize">{resultData.samplingPoints.join(", ") || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
