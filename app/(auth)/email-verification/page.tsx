"use client";

import { verifyingTokenEmail } from "@/action/verification";
import FormStatus, { FormStatusType } from "@/components/FormStatus";
import SignCard from "@/components/auth/SignCard";
import { useSearchParams } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

type Props = {};

function EmailVerification({}: Props) {
  const [status, setStatus] = useState<FormStatusType>({} as FormStatusType);
  const [loading, isLoading] = useState(false);
  const param = useSearchParams();
  const token = param.get("token") || "";

  useLayoutEffect(() => {
    const onVerify = async () => {
      if (!token) {
        setStatus({ status: "error", message: "Missing token!" });
        return;
      }

      isLoading(true);
      const res = await verifyingTokenEmail(token).catch(() => {
        setStatus({ status: "error", message: "Something went wrong!" });
      });
      isLoading(false);

      if (res?.error) {
        setStatus({ status: "error", message: res?.error || "" });
      }
      if (res?.success) {
        setStatus({ status: "success", message: res.success });
        setStatus({} as FormStatusType);
      }
    };
    onVerify();
  }, []);

  return (
    <SignCard
      title="Email Confirmation"
      description="Verifying email in Progress"
      pathLabel="Back to login"
      path="/signin"
    >
      <div className="flex justify-center">
        <Wrapper status={!status}>
          <BeatLoader size={15} loading={loading} />
        </Wrapper>
        <Wrapper status={Boolean(status)}>
          <FormStatus status={status.status} message={status.message} />
        </Wrapper>
      </div>
    </SignCard>
  );
}

const Wrapper = ({
  status,
  children,
}: {
  status: boolean;
  children: React.ReactNode;
}) => (status ? children : null);

export default EmailVerification;
