import SignCard from "@/components/auth/SignCard";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

function AuthErrorPage() {
  return (
    <SignCard
      title="Auth Error"
      description="Oops ! something went wrong"
      pathLabel="Back to login"
      path="/signin"
    >
      <div className="flex justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </SignCard>
  );
}

export default AuthErrorPage;
