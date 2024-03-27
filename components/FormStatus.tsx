import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";
import React from "react";

export type FormStatusType = { message: string; status: string };

function FormStatus({ message, status }: Partial<FormStatusType>) {
  const acceptedStatus = ["success", "error"];

  if (status && !acceptedStatus.includes(status)) {
    return null;
  }

  if (!message || !status) {
    return null;
  }

  const isSuccess = status === "success";

  return (
    <div
      className={`${
        isSuccess
          ? "border bg-emerald-100 border-emerald-200 text-emerald-500"
          : "border bg-destructive/10 border-destructive/20 text-destructive"
      } rounded p-3 flex gap-x-2 items-center text-sm `}
    >
      {isSuccess ? (
        <CheckCircledIcon className="w-4 h-4" />
      ) : (
        <ExclamationTriangleIcon className="w-4 h-4" />
      )}
      <p>{message}</p>
    </div>
  );
}

export default FormStatus;
