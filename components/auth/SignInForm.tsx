"use client";

import { authenticate } from "@/action/signin";
import { signInSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";
import FormStatus, { FormStatusType } from "../FormStatus";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";

function SignInForm() {
  const [status, setStatus] = useState<FormStatusType>({} as FormStatusType);
  const [isPending, startTransition] = useTransition();
  const params = useSearchParams();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (params.get("error") === "OAuthAccountNotLinked") {
      setStatus({
        status: "error",
        message: "Use different provider to login",
      });
    }
  }, [params]);

  const onSubmit = (value: z.infer<typeof signInSchema>) => {
    startTransition(async () => {
      await authenticate(value).then((res) => {
        if (res?.error) {
          setStatus({ status: "error", message: res.error });
        }

        if (res?.success) {
          setStatus({ status: "success", message: res.success });
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@gmail.com"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormStatus status={status.status} message={status.message} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && (
            <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm;
