import { cn } from "@/lib/utils";

type DividerVariant = "subtle" | "medium" | "strong" | "clay";
type DividerOrientation = "horizontal" | "vertical";

interface DividerProps {
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  spacing?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const variantStyles: Record<DividerVariant, string> = {
  subtle: "border-white/5",
  medium: "border-white/10",
  strong: "border-white/20",
  clay:   "border-pov-clay/30",
};

const spacingStyles = {
  sm: "my-6",
  md: "my-10",
  lg: "my-16",
};

export default function Divider({
  variant = "subtle",
  orientation = "horizontal",
  spacing = "md",
  label,
  className,
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "w-px self-stretch",
          variantStyles[variant].replace("border-", "bg-"),
          className
        )}
      />
    );
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-4", spacingStyles[spacing], className)}>
        <div className={cn("flex-1 border-t", variantStyles[variant])} />
        <span className="text-label text-pov-mist">{label}</span>
        <div className={cn("flex-1 border-t", variantStyles[variant])} />
      </div>
    );
  }

  return (
    <hr
      className={cn(
        "border-0 border-t",
        variantStyles[variant],
        spacingStyles[spacing],
        className
      )}
    />
  );
}
