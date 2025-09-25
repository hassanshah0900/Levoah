import { cn, formatDate } from "@/lib/utils";
import { useState } from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function DateInput({
  value,
  onChange,
  ref,
  name,
}: ControllerRenderProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value instanceof Date ? value : undefined
  );
  const {
    formState: { errors },
  } = useFormContext();

  const invalid = !!errors[name];

  function getButtonText() {
    return selectedDate ? formatDate(selectedDate) : "Select Date";
  }
  function handleSelect(date: Date) {
    setOpen(false);
    setSelectedDate(date);
    onChange(date);
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant={"outline"}
          className={cn(invalid && "border-destructive")}
        >
          {getButtonText()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-max">
        <Calendar
          required
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
