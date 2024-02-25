"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

function Users({}: Props) {
  const router = useRouter();
  return (
    <div>
      <label>Users</label>
      <Button
        onClick={() => {
          localStorage.removeItem("authenticated");
          router.push("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default Users;
