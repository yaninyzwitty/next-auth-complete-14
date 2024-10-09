"use client";
import {registerWithValues} from "@/actions/register";
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
import {RegisterSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

function RegisterSchemaPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setSuccess("");
    setError("");
    startTransition(() => {
      registerWithValues(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
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
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Yaninyz witty"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mail@mail.com"
                      type="email"
                      disabled={isPending}
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

            <FormSuccess message={success as string} />
            <FormError message={error as string} />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Link
          href={"/login"}
          className="text-sm hover:underline underline-offset-1 font-medium  tracking-wide"
        >
          Already have an account?
        </Link>
      </CardFooter>
    </Card>
  );
}

export default RegisterSchemaPage;
