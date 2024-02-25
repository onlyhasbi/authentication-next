"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { signUpSchema } from "@/schema";
import FormError, { FormStatusType } from "../FormStatus";
import { useEffect, useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

type Props = {};

function SignUpForm({}: Props) {
  const [status, setStatus] = useState<FormStatusType>({} as FormStatusType);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    startTransition(async () => {
      await axios
        .post("/register", values)
        .then(({ data: data }) => {
          if (data) {
            router.push("/signin");
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john.doe@example.com"
                  type="email"
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
        <FormError status={status.status} message={status.message} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && (
            <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
          )}
          <span>Create an Account</span>
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
