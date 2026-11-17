"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircleIcon } from "lucide-react";

interface CardTitleProps {
  title: string;
  editTitle?: string;
  addTitle?: string;
  hasContent?: boolean;
  isEditing?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  title,
  editTitle = "Edit",
  addTitle = "Add",
  hasContent = false,
  isEditing: controlledIsEditing,
  onToggle,
  className,
}) => {
  const [internalEditing, setInternalEditing] = useState(false);
  const isControlled = typeof controlledIsEditing === "boolean";
  const isEditing = isControlled ? controlledIsEditing : internalEditing;

  const toggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalEditing((v) => !v);
      onToggle?.();
    }
  };

  return (
    <div
      className={`flex items-center justify-between font-medium ${
        className ?? ""
      }`}
    >
      <div className="text-webpink">{title}</div>
      <Button onClick={toggle} variant="ghost" className="text-webpink">
        {isEditing ? (
          <>Cancel</>
        ) : (
          <>
            {hasContent ? (
              <>
                <Pencil className="w-6 h-6 pr-1" /> {editTitle}
              </>
            ) : (
              <>
                <PlusCircleIcon className="w-6 h-6 pr-1" /> {addTitle}
              </>
            )}
          </>
        )}
      </Button>
    </div>
  );
};
