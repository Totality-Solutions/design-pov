import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement>;

export default function Section({ className, ...props }: SectionProps) {
  return <section className={cn("py-12 lg:py-16 px-6 lg:px-10", className)} {...props} />;
}
