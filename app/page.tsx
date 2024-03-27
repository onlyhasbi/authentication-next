"use client";

import { isAuthenticated } from "@/action/auth";
import loading from "@/assets/common/loading.gif";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

export default function Home() {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isAuth, setIsAuth] = useState("loading");

  useEffect(() => {
    startTransition(async () => {
      setIsAuth("loading");
      await isAuthenticated()
        .then((res) => (!res ? setIsAuth("failed") : setIsAuth("success")))
        .catch(() => setIsAuth("failed"));
    });
  }, []);

  if (["success", "failed"].includes(isAuth)) {
    return (
      <Container>
        <React.Fragment>
          <h3 className="text-2xl font-semibold">Main Page</h3>
          <AuthButton isAuth={isAuth as string} />
        </React.Fragment>
      </Container>
    );
  }

  return (
    <Container>
      <Image src={loading} width={50} height={50} alt="loading-gif" />
    </Container>
  );
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
