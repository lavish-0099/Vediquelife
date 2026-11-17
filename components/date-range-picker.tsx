"use client";

import { useState } from "react";
import {
  DateRangePicker as ReactDateRangePicker,
  createStaticRanges,
  defaultStaticRanges,
} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Button } from "@/components/ui/button";

interface DateRangePickerProps {
  onDateRangeSelect: (range: string | null) => void;
  minDate?: Date;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onDateRangeSelect = () => {},
  minDate = new Date(2024, 1, 1),
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 6, // Correct last 7 days
      0,
      0,
      0,
      0,
    ),
    endDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      23,
      59,
      59,
      999,
    ),
    key: "selection",
  });

  const customStaticRanges = createStaticRanges([
    ...defaultStaticRanges,
    {
      label: "Last 7 Days",
      range: () => ({
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 6, // Ensure 7 days selection
          0,
          0,
          0,
          0,
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          23,
          59,
          59,
          999,
        ),
      }),
    },
    {
      label: "Last 30 Days",
      range: () => ({
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - 29, // 30 days
          0,
          0,
          0,
          0,
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          23,
          59,
          59,
          999,
        ),
      }),
    },
    {
      label: "All Time",
      range: () => ({
        startDate: minDate,
        endDate: new Date(),
      }),
    },
  ]);

  const handleSelect = (ranges: any) => {
    const range = ranges.selection;
    setDateRange(range);
  };

  const applyDateRange = () => {
    const startDateUTC = dateRange.startDate.toISOString();
    const endDateUTC = dateRange.endDate.toISOString();

    onDateRangeSelect(`${startDateUTC} - ${endDateUTC}`);
    setIsPickerOpen(false);
  };

  return (
    <div className="flex items-center justify-end relative">
      <div className="flex">
        <Button
          onClick={() => setIsPickerOpen(!isPickerOpen)}
          className="px-3 py-2 bg-webprimary text-white rounded"
        >
          {`${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`}
        </Button>
      </div>

      {isPickerOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white p-3 shadow-md rounded-md z-10">
          <ReactDateRangePicker
            ranges={[dateRange]}
            onChange={handleSelect}
            months={2}
            direction="horizontal"
            maxDate={new Date()}
            minDate={minDate}
            showMonthAndYearPickers={false}
            rangeColors={["#db2777"]}
            showDateDisplay={true}
            staticRanges={customStaticRanges}
            inputRanges={[]}
            initialFocusedRange={[0, 0]}
            className="border border-webprimary"
            startDatePlaceholder="Start Date"
            endDatePlaceholder="End Date"
          />
          <Button
            onClick={applyDateRange}
            className="mt-3 flex bg-webprimary text-white py-1.5 rounded hover:bg-webtertiary"
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
