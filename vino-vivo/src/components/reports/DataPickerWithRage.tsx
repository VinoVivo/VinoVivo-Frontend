// import * as React from "react";
// import { LuCalendarDays } from "react-icons/lu";
// import { format } from "date-fns";
// import { DateRange, SelectRangeEventHandler } from "react-day-picker";
// import "react-day-picker/lib/style.css";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";

// interface DatePickerWithRangeProps {
//     startDate: Date | null;
//     endDate: Date | null;
//     setStartDate: (date: Date | null) => void;
//     setEndDate: (date: Date | null) => void;
//     className?: string;
// }

// export const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
//     startDate,
//     endDate,
//     setStartDate,
//     setEndDate,
//     className,
// }) => {

//     const handleDateSelect: SelectRangeEventHandler = ({ from, to }: { from: Date; to: Date }) => {
//         if (from && to) {
//           setStartDate(from);
//           setEndDate(to);
//         }
//       };

//     return (
//         <div className={cn("grid gap-2", className)}>
//             <Popover>
//                 <PopoverTrigger asChild>
//                 <Button
//                     id="date"
//                     variant={"outline"}
//                     className={cn(
//                     "w-[300px] justify-start text-left font-normal",
//                     startDate && endDate ? "" : "text-muted-foreground"
//                     )}
//                 >
//                     <LuCalendarDays className="mr-2 h-4 w-4" />
//                     {startDate && endDate ? (
//                     <>
//                         {format(startDate, "LLL dd, y")} - {format(endDate, "LLL dd, y")}
//                     </>
//                     ) : (
//                     <span>Pick a date range</span>
//                     )}
//                 </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                     initialFocus
//                     mode="range"
//                     defaultMonth={startDate || undefined}
//                     selected={{ from: startDate, to: endDate }}
//                     onSelect={handleDateSelect}
//                     numberOfMonths={2}
//                 />
//                 </PopoverContent>
//             </Popover>
//         </div>
//     );
// };
