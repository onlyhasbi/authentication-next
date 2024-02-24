"use client";

import SignCard from "@/components/auth/SignCard";
import SignInForm from "@/components/auth/SignInForm";

type Props = {};

function SignIn({}: Props) {
  return (
    <SignCard
      title="Sign In"
      description="Welcome back"
      pathLabel="Don't have an account?"
      path="/signup"
      isSocial
    >
      <SignInForm />
    </SignCard>
  );
}

export default SignIn;
