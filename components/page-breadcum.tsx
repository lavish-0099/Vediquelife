"use client";

import { SlashIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface PageBreadcumProps {
  currentPage?: string;
  className?: string;
  hoverClassName?: string;
}

const PageBreadcum = ({
  currentPage,
  className,
  hoverClassName,
}: PageBreadcumProps) => {
  return (
    <Breadcrumb className="flex items-center justify-center  py-2 font-bold">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className={cn("text-white hover:text-webyellow", hoverClassName)}
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className={cn("text-white", className)}>
            {currentPage}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageBreadcum;
