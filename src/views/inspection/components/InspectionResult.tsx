import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InspectionResponse } from "@/services/inspection/types";

export default function InspectionResult({
  resultData,
}: {
  resultData: InspectionResponse;
}) {
  return (
    <div className="bg-white border rounded-lg shadow-md px-6 py-6 flex flex-col gap-2">
      <h2 className="text-2xl mb-2 font-semibold">Inspection Result</h2>

      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col w-full">
          <h3 className="text-xl font-bold mb-2">Composition</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="rounded-tl-md bg-gray-100">Name</TableHead>
                <TableHead className="text-right bg-gray-100">Length</TableHead>
                <TableHead className="rounded-tr-md text-right bg-gray-100">
                  Actual
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {resultData.standardData?.standardTypePercentages &&
                Object.entries(resultData.standardData.standardTypePercentages)
                  .map(([name, percentage]) => {
                    const condition = resultData.standardData?.conditions.find(
                      (cond) => cond.name === name,
                    );

                    const lengthDisplay = condition
                      ? condition.minLength === condition.maxLength
                        ? `= ${condition.minLength}`
                        : condition.minLength !== undefined &&
                          condition.maxLength !== undefined
                        ? `${condition.minLength} - ${condition.maxLength}`
                        : `>= ${condition.minLength || 0}`
                      : "";

                    return {
                      name: condition?.name || name,
                      lengthDisplay,
                      percentage,
                      minLength: condition?.minLength || 0,
                    };
                  })
                  .sort((a, b) => b.minLength - a.minLength)
                  .map(({ name, lengthDisplay, percentage }, index) => (
                    <TableRow key={index}>
                      <TableCell>{name}</TableCell>
                      <TableCell className="text-right">{lengthDisplay}</TableCell>
                      <TableCell className="text-right">
                        {percentage.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col w-full">
          <h3 className="text-xl font-bold mb-2">Defect Rice</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-gray-100 rounded-tl-md">Name</TableHead>

                <TableHead className="text-right bg-gray-100 rounded-tr-md">
                  Actual
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {resultData.standardData?.grainTypePercentages &&
                Object.entries(resultData.standardData.grainTypePercentages).map(
                  ([key, percentage], index) => (
                    <TableRow key={index}>
                      <TableCell>{key}</TableCell>

                      <TableCell className="text-right">
                        {percentage.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ),
                )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
