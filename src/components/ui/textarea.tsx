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

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export interface FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: TName;
  control: Control<TFieldValues, any>;
  label?: string;
  description?: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
}

const FormTextarea = <TFieldValues extends FieldValues>(
  props: FormTextareaProps<TFieldValues>
): JSX.Element => {
  const {
    name,
    control,
    label,
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
              {label && (
                <FormLabel className={classNameLabel}>{label}</FormLabel>
              )}
              <FormControl>
                <Textarea
                  {...propsInput}
                  className={classNameInput}
                  onChange={(e) => {
                    field.onChange(e);
                    props.onChange && props.onChange(e);
                  }}
                  onBlur={(e) => {
                    field.onBlur();
                    props.onBlur && props.onBlur(e);
                  }}
                />
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

export { FormTextarea, Textarea };
