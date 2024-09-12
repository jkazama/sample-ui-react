import { useAuth, useMessage } from "@/hooks";
import { isWebRequestError } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Form } from "../ui/form";
import { FormInput } from "../ui/input";

export const Login = () => {
  const { handleError } = useMessage();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState<string>("");

  const formSchema = z.object({
    loginId: z.string().min(1).max(30),
    password: z.string().min(1).max(200),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginId: "",
      password: "",
    },
  });

  useEffect(() => {
    form.setFocus("loginId");
  }, []);

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      setLoginError("");
      await login(value);
    } catch (e) {
      if (isWebRequestError(e) && e.statusCode === 400) {
        setLoginError("Incorrect ID or password.");
        return;
      }
      handleError(e);
    }
  };
  return (
    <div className="p-3 flex justify-center">
      <Card className="w-1/3">
        <CardContent className="p-2">
          <Form {...form}>
            {loginError && (
              <Alert className="mb-2" variant="warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormInput control={form.control} label="ID" name="loginId" />
              <FormInput
                control={form.control}
                label="Password"
                name="password"
                type="password"
              />
              <Button
                className="w-full"
                type="submit"
                disabled={!form.formState.isValid}
              >
                {form.formState.isSubmitting && (
                  <LoaderCircle className="animate-spin mr-2" size={18} />
                )}
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
