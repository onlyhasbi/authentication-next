"use client";

import SignCard from "@/components/auth/SignCard";
import SignUpForm from "@/components/auth/SignUpForm";
import React from "react";

type Props = {};

function SignUp({}: Props) {
  return (
    <SignCard
      title="Sign Up"
      description="Create new account"
      pathLabel="Already have an account?"
      path="/signin"
      isSocial
    >
      <SignUpForm />
    </SignCard>
  );
}

export default SignUp;
