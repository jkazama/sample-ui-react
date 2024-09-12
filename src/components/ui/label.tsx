import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-xs font-medium text-muted-foreground leading-none tracking-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export interface LabelTextProps extends React.HTMLAttributes<HTMLDivElement> {
  classNameLabel?: string;
  classNameText?: string;
  label: string;
  horizontal?: boolean;
}

const LabelText = ({
  className,
  classNameLabel,
  classNameText,
  label,
  horizontal,
  children,
  ...props
}: LabelTextProps) => (
  <div
    className={cn(horizontal ? "flex items-center gap-2" : "", className)}
    {...props}
  >
    <Label className={cn(labelVariants(), classNameLabel)}>{label}</Label>
    <div className={cn(classNameText, "text-sm leading-5")}>
      {children ? children : "　"}
    </div>
  </div>
);
LabelText.displayName = "LabelText";

export { Label, LabelText };
