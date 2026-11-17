"use client";

import { SearchInput } from "@/components/header/search-input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const SearchIcon = () => {
  return (
    <div className="relative">
      <Sheet>
        <SheetTrigger
          aria-label="Search"
          className="hidden md:flex items-center text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1e3d34] hover:opacity-70 transition"
        >
          Search
        </SheetTrigger>
        <SheetContent
          side="top"
          className="flex flex-row items-center justify-center"
        >
          <SearchInput />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchIcon;
