"use client";

import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { TimePicker } from "@/components/ui/time-picker";
import { UpdateInspectionRequest } from "@/services/inspection/types";
import useMutationUpdateInspectionById from "@/views/history/hooks/useMutationUpdateInspectionById";

const samplingPoints = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "other", label: "Other" },
];

const formSchema = z.object({
  note: z.string().optional(),
  price: z.coerce.number().min(0).max(100000).optional(),
  samplingPoints: z.array(z.string()).optional(),
  samplingDateTime: z
    .union([z.string().transform((str) => new Date(str)), z.date()])
    .optional(),
});

export default function EditInspectionForm({
  initialData,
  resultId,
}: {
  initialData?: UpdateInspectionRequest;
  resultId: string;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: initialData?.note || "",
      price: initialData?.price || undefined,
      samplingPoints: initialData?.samplingPoints || [],
      samplingDateTime: initialData?.samplingDateTime
        ? new Date(initialData.samplingDateTime)
        : undefined,
    },
  });

  const updateInspection = useMutationUpdateInspectionById(
    resultId,
    form.getValues()
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData: UpdateInspectionRequest = {
      note: values.note,
      price: values.price,
      samplingDateTime: values.samplingDateTime,
      samplingPoints: values.samplingPoints,
    };

    updateInspection.mutate(formData);
    router.push(`/inspection/result/${resultId}`);
  }

  function onCancel() {
    router.push(`/inspection/result/${resultId}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        {/* Note field */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormDescription>
                Additional notes for the inspection
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Add any notes"
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
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
              <FormDescription>
                Price (within the range of 0 - 100,000)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sampling Points */}
        <FormField
          control={form.control}
          name="samplingPoints"
          render={() => (
            <FormItem>
              <FormLabel>Sampling Points</FormLabel>
              <FormDescription>Select sampling points</FormDescription>
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
                                ? field.onChange([
                                    ...(field.value || []),
                                    point.id,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== point.id
                                    )
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

        {/* Date/Time of Sampling */}
        <FormField
          control={form.control}
          name="samplingDateTime"
          render={({ field }) => (
            <FormItem className="flex w-fit flex-col gap-1">
              <FormLabel>Date/Time of Sampling</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy HH:mm:ss")
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
              <FormDescription>
                Select the date and time of sampling
              </FormDescription>
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
