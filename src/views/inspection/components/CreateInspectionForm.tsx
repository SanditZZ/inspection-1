"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { TimePicker } from "@/components/ui/time-picker";
import { useRouter } from "next/navigation";
import useMutationCreateInspection from "@/views/history/hooks/useMutationCreateInspection";
import { Condition, CreateInspectionRequest } from "@/services/inspection/types";
import { useEffect, useState } from "react";
import useFetchStandards from "@/views/inspection/hooks/useFetchStandards";
import { Grain } from "@/lib/history/types";
import {
  calculateGrainTypePercentage,
  calculateStandardPercentage,
} from "@/views/inspection/utils/calculations";

const samplingPoints = [
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "backend",
    label: "Backend",
  },
  {
    id: "other",
    label: "Other",
  },
] as const;

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "json") return true;
  }
  return false;
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  standardID: z.string(),
  standardName: z.string(),
  note: z.string().optional(),
  price: z.coerce.number().min(0).max(100000).optional(),
  samplingPoints: z.array(z.string()).optional(),
  samplingDateTime: z.date().optional(),
  upload: z
    .instanceof(File)
    .refine(checkFileType, {
      message: "Invalid file type. Only JSON files are allowed.",
    })
    .optional(),
});

export default function CreateInspectionForm() {
  const router = useRouter();
  const createInspection = useMutationCreateInspection();

  const { data: standardsData } = useFetchStandards();

  const [uploadedGrains, setUploadedGrains] = useState<Grain[]>([]);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleFileChange = async (file: File | undefined) => {
    if (file) {
      const content = await file.text();
      const jsonData = JSON.parse(content);
      setImageURL(jsonData.imageURL);
      setUploadedGrains(jsonData.grains);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      standardID: undefined,
      standardName: "",
      note: "",
      price: undefined,
      samplingPoints: [],
      samplingDateTime: undefined,
      upload: undefined,
    },
  });

  useEffect(() => {
    const selectedStandardId = form.watch("standardID");
    if (selectedStandardId && standardsData) {
      const selectedStandard = standardsData.find((s) => s.id === selectedStandardId);
      if (selectedStandard) {
        form.setValue("standardName", selectedStandard.name);
      }
    }
  }, [form.watch("standardID"), standardsData]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedStandard = standardsData?.find(
      (standard) => standard.id === values.standardID,
    );

    const totalSample = uploadedGrains.length;
    const grainTypePercentages = calculateGrainTypePercentage(uploadedGrains);
    const standardTypePercentages = selectedStandard
      ? calculateStandardPercentage(uploadedGrains, selectedStandard)
      : {};

    const conditions: Condition[] = selectedStandard?.standardData
      ? selectedStandard.standardData.map((criterion) => ({
          conditionMax: criterion.conditionMax,
          conditionMin: criterion.conditionMin,
          key: criterion.key,
          name: criterion.name,
          shape: criterion.shape,
          maxLength: criterion.maxLength,
          minLength: criterion.minLength,
        }))
      : [];

    const formData: CreateInspectionRequest = {
      name: values.name,
      standardID: values.standardID,
      note: values.note ?? "",
      standardName: values.standardName,
      samplingDateTime: values.samplingDateTime,
      samplingPoints: values.samplingPoints,
      price: values.price,
      imageLink: imageURL ?? undefined,
      standardData: {
        totalSample,
        conditions,
        grainTypePercentages,
        standardTypePercentages,
      },
    };

    createInspection.mutate(formData, {
      onSuccess: (data) => {
        const inspectionID = data.inspectionID;
        router.push(`/inspection/result/${inspectionID}`);
      },
    });
  }

  function onCancel() {
    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>Name of the inspection</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Standard select field */}
        <FormField
          control={form.control}
          name="standardID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Standard</FormLabel>
              {standardsData && standardsData.length > 0 ? (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a standard" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {standardsData.map((standard) => (
                      <SelectItem key={standard.id} value={standard.id}>
                        {standard.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  disabled
                  placeholder="No standards available"
                  className="bg-muted"
                />
              )}
              <FormDescription>Select the standard of the inspection</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Note field */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any notes"
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>Additional notes for the inspection</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price field */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter price"
                  step="0.01"
                  min="0"
                  max="100000"
                  {...field}
                />
              </FormControl>
              <FormDescription>Price (within the range of 0 - 100,000)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sampling point with checkboxes field */}
        <FormField
          control={form.control}
          name="samplingPoints"
          render={() => (
            <FormItem>
              <div className="mb-2">
                <FormLabel>Sampling Points</FormLabel>
                <FormDescription>Select sampling points</FormDescription>
              </div>
              <div className="flex flex-col gap-2">
                {samplingPoints.map((point) => (
                  <FormField
                    key={point.id}
                    control={form.control}
                    name="samplingPoints"
                    render={({ field }) => (
                      <FormItem
                        key={point.id}
                        className="flex place-items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(point.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), point.id])
                                : field.onChange(
                                    field.value?.filter((value) => value !== point.id),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel>{point.label}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date/time of sampling field */}
        <FormField
          control={form.control}
          name="samplingDateTime"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Date/Time of Sampling</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm:ss")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="p-3 border-t border-border">
                    <TimePicker setDate={field.onChange} date={field.value} />
                  </div>
                </PopoverContent>
              </Popover>
              <FormDescription>Select the date and time of sampling</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Upload */}
        <FormField
          control={form.control}
          name="upload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload JSON File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    handleFileChange(file);
                    field.onChange(file);
                  }}
                />
              </FormControl>
              <FormDescription>Upload a JSON file for grain data</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          {/* Cancel Button */}
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>

          {/* Submit Button */}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
