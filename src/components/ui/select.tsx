import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-7 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: TName;
  control: Control<TFieldValues, any>;
  label?: string;
  description?: string;
  className?: string;
  classNameLabel?: string;
  classNameSelect?: string;
  required?: boolean;
  disabled?: boolean;
  enumeraiton?: boolean;
  autoComplete?: string;
  placeholder?: string;
  items: SelectPrimitive.SelectItemProps[];
  onValueChange?: (v: string | undefined) => void;
}

const FormSelect = <TFieldValues extends FieldValues>(
  props: FormSelectProps<TFieldValues>
): JSX.Element => {
  const {
    name,
    control,
    label,
    description,
    className,
    classNameLabel,
    classNameSelect,
    required,
    disabled,
    enumeraiton,
    autoComplete,
    placeholder,
    items,
    onValueChange,
    value,
    ...rest
  } = props;
  const EMPTY_VALUE = "___EMPTY___";
  const itemsValid = required
    ? items
    : [{ value: EMPTY_VALUE, textValue: "　" }, ...items];
  return (
    <div className={className}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          const propsSelect = { ...field, ...rest };
          return (
            <FormItem>
              <div>
                {label && (
                  <FormLabel className={classNameLabel}>{label}</FormLabel>
                )}
                <Select
                  autoComplete={autoComplete}
                  required={required}
                  disabled={disabled}
                  onValueChange={(e) => {
                    const v =
                      e === EMPTY_VALUE ? (enumeraiton ? undefined : "") : e;
                    field.onChange(v);
                    onValueChange && onValueChange(v);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        {...propsSelect}
                        className={classNameSelect}
                        placeholder={placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {itemsValid.map((item, idx) => {
                      return (
                        <SelectItem key={idx} value={item.value}>
                          {item.textValue}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};

const FormAutoComplete = <TFieldValues extends FieldValues>(
  props: FormSelectProps<TFieldValues>
): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const {
    name,
    control,
    label,
    description,
    className,
    classNameLabel,
    classNameSelect,
    required,
    disabled,
    placeholder,
    enumeraiton,
    items,
    // ...rest low: 指定以外利用したい時は都度追加
  } = props;
  return (
    <div className={className}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem>
              <div>
                {label && (
                  <FormLabel className={classNameLabel}>{label}</FormLabel>
                )}
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger
                      asChild
                      className="flex h-7 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                    >
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        disabled={disabled}
                        className={cn("flex justify-between", classNameSelect)}
                        {...field}
                      >
                        <div>
                          {field.value
                            ? items.find((item) => item.value === field.value)
                                ?.textValue
                            : placeholder}
                        </div>
                        <div>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="キーワード検索" />
                        <CommandList>
                          <CommandEmpty>情報が見つかりません</CommandEmpty>
                          <CommandGroup>
                            {items.map((item) => (
                              <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={(currentValue) => {
                                  let v =
                                    !required && currentValue === field.value
                                      ? enumeraiton
                                        ? undefined
                                        : ""
                                      : currentValue;
                                  field.onChange(v);
                                  props.onValueChange && props.onValueChange(v);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === item.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {item.textValue}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </div>
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export {
  FormAutoComplete,
  FormSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
