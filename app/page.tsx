"use client";

import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/data/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function Home() {
  const route = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isPending, startTransition] = useTransition();

  const AuthButton = () => {
    if (isPending) {
      return <p>Loading ...</p>;
    } else {
      return !isAuth ? (
        <Button onClick={() => route.push("/signin")}>Sign In</Button>
      ) : (
        <Button onClick={() => route.push("/dashboard")}>Dashboard</Button>
      );
    }
  };

  useEffect(() => {
    startTransition(async () => {
      await isAuthenticated().then((res) => res && setIsAuth(true));
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">Main Page</h3>
        <AuthButton />
      </div>
    </div>
  );
}
