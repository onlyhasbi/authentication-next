"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import FormError, { FormStatusType } from "../FormStatus";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { signInSchema } from "@/schema";
import { useEffect, useState, useTransition } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

type Props = {};

function SignInForm({}: Props) {
  const [status, setStatus] = useState<FormStatusType>({} as FormStatusType);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    startTransition(async () => {
      await axios
        .post("/auth", values)
        .then(({ data: { data } }) => {
          if (data) {
            localStorage.setItem("authenticated", JSON.stringify(data));
            router.push("/dashboard");
          }
        })
        .catch(({ response }) => {
          const key = Object.keys(response.data)[0];
          setStatus({
            status: Object.keys(response.data)[0],
            message: response.data[key] as string,
          });
        });
    });
  };

  useEffect(() => {
    if (status) {
      form.setError(status.status as any, {
        message: status.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} disabled={isPending} />
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
        <FormError status={status.status} message={status.message} />
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
