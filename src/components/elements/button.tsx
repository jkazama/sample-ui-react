import { cn } from "@/libs/utils";
import React from "react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "px-3 py-1 rounded border border-input bg-slate-500 text-slate-50 shadow-sm hover:bg-slate-400 hover:text-slate-50 leading-normal tracking-normal",
      className
    )}
    {...props}
  />
));
Button.displayName = "Button";

export { Button };
