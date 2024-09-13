import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/input";
import { useMessage } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAsset } from "../../hooks";
import { UserCashOut } from "../../types";

export const AssetWithdrawRegister = ({
  className,
  registered,
}: {
  className?: string;
  registered?: (v: UserCashOut) => void;
}) => {
  const { notify, handleError } = useMessage();
  const { withdraw } = useAsset();

  const formSchema = z.object({
    currency: z.string().min(3).max(3),
    absAmount: z.coerce.number().positive(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: "USD",
      absAmount: undefined,
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const result = await withdraw(value);
      registered && registered(result);
      notify(
        `Withdrawal request accepted. ${value.currency} - ${value.absAmount}`
      );
    } catch (e) {
      handleError(e).forEach((column) => {
        const key = column.field as keyof typeof value;
        form.setError(key, { message: column.message });
      });
    }
  };

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-1">
            <FormInput
              className="w-2/3"
              control={form.control}
              label="Withdrawal Amount *"
              name="absAmount"
            />
            <Button
              className="w-1/3 mt-7"
              type="submit"
              loading={form.formState.isSubmitting}
            >
              Request
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
