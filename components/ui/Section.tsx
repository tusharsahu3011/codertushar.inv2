import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  children: ReactNode;
  className?: string;
};

export default function Section<T extends ElementType = "section">({
  as,
  children,
  className,
}: SectionProps<T>) {
  const Component = as || "section";

  return (
    <Component
      className={cn(
        "relative py-20 md:py-28",
        className
      )}
    >
      {children}
    </Component>
  );
}