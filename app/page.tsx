'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const navigate = useRouter();
  const isAuthenticated = false;
  useEffect(() => {
    isAuthenticated
      ? navigate.push("/dashboard")
      : navigate.push("/auth/signin");
  }, []);
  return null;
}
