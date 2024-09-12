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

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-7 w-full rounded-md border border-input bg-background px-2 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: TName;
  control: Control<TFieldValues, any>;
  label?: string;
  description?: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const FormInput = <TFieldValues extends FieldValues>(
  props: FormInputProps<TFieldValues>
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
                <Input
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

const FormInputFile = <TFieldValues extends FieldValues>(
  props: FormInputProps<TFieldValues>
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
        render={({ field: { value, onChange, ...fieldProps } }) => {
          const propsInput = { ...fieldProps, ...rest };
          return (
            <FormItem>
              {label && (
                <FormLabel className={classNameLabel}>{label}</FormLabel>
              )}
              <FormControl>
                <Input
                  {...propsInput}
                  type="file"
                  className={classNameInput}
                  onChange={(e) => {
                    if (e.target.files) {
                      rest.multiple
                        ? onChange(e.target.files)
                        : onChange(e.target.files.item(0));
                    }
                    props.onChange && props.onChange(e);
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

export { FormInput, FormInputFile, Input };
