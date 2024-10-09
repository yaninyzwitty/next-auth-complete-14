"use client";
import {loginWithValues} from "@/actions/login";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {LoginSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {AuthError} from "next-auth";
import {signIn} from "next-auth/react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const urlError =
    searchParams.get("error") === "CredentialsSignin" &&
    searchParams.get("code") === "credentials"
      ? "Invalid credentials"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      loginWithValues(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }

          if (data.success) {
            const {email, password} = data.success;

            try {
              signIn("credentials", {
                email: email,
                password,
                redirectTo: "/settings",
              });
            } catch (error) {
              if (error instanceof AuthError) {
                switch (error.type) {
                  case "CredentialsSignin":
                    return {error: "Invalid credentials!"};
                  default:
                    return {error: "Something went wrong!"};
                }
              }

              throw error;
            }

            console.log("ok witty");
          }
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  }
  return (
    <Card className="w-[400px] p-2">
      <CardHeader className="text-lg font-semibold text-center uppercase">
        WITTY-CARD-PASS
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="mail@mail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      disabled={isPending}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              Submit
            </Button>

            <FormError message={(error as string) || urlError} />
            <FormSuccess message={success as string} />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Link
          href={"/register"}
          className="text-sm hover:underline underline-offset-1 font-medium  tracking-wide"
        >
          Dont have an account already?
        </Link>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
