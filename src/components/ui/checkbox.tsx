import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export interface FormCheckProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: TName;
  control: Control<TFieldValues, any>;
  label?: string;
  supportLabel?: boolean;
  description?: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  onCheckedChange?: (v: string | boolean) => void;
}

const FormCheck = <TFieldValues extends FieldValues>(
  props: FormCheckProps<TFieldValues>
): JSX.Element => {
  const {
    name,
    control,
    label,
    supportLabel,
    description,
    className,
    classNameLabel,
    classNameInput,
    value,
    ...rest
  } = props;
  return (
    <div className={className}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          const propsInput = { ...field, ...rest };
          return (
            <FormItem>
              {!supportLabel && label && (
                <FormLabel className={classNameLabel}>{label}</FormLabel>
              )}
              <FormControl>
                <div className="flex items-center space-x-2">
                  <input
                    {...propsInput}
                    type="checkbox"
                    id={propsInput.id || propsInput.name}
                    className={classNameInput}
                    checked={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      props.onCheckedChange &&
                        props.onCheckedChange(e.target.value);
                    }}
                  />
                  {supportLabel && label && (
                    <label
                      htmlFor={propsInput.id || propsInput.name}
                      className={cn(
                        "text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                        classNameLabel
                      )}
                    >
                      {label}
                    </label>
                  )}
                </div>
              </FormControl>
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export { Checkbox, FormCheck };
