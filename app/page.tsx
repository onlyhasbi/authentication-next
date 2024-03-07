"use client";

import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/data/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

type Status = "success" | "failed" | "loading";

export default function Home() {
  const [isAuth, setIsAuth] = useState<Status>("loading");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      setIsAuth("loading");
      await isAuthenticated()
        .then((res) => (!res ? setIsAuth("failed") : setIsAuth("success")))
        .catch(() => setIsAuth("failed"));
    });
  }, []);

  if (["success", "failed"].includes(isAuth) && !isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-semibold">Main Page</h3>
          <AuthButton isAuth={isAuth} />
        </div>
      </div>
    );
  }

  if (!isPending || isAuth === "loading") {
    return null;
  }
}

function AuthButton({ isAuth }: { isAuth: string }) {
  const route = useRouter();

  if (isAuth === "failed") {
    return <Button onClick={() => route.push("/signin")}>Sign In</Button>;
  }

  if (isAuth === "success") {
    return <Button onClick={() => route.push("/dashboard")}>Dashboard</Button>;
  }

  return null;
}
