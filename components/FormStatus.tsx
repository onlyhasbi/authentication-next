import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";
import React from "react";

type Props = { message: string; status: string };

function FormStatus({ message, status }: Partial<Props>) {
  const isStatus = status === "success";

  if (!message || !status) {
    return null;
  }

  return (
    <div
      className={`${
        isStatus
          ? "border bg-emerald-100 border-emerald-200 text-emerald-500"
          : "border bg-destructive/10 border-destructive/20 text-destructive"
      } rounded p-3 flex gap-x-2 items-center text-sm `}
    >
      {isStatus ? (
        <CheckCircledIcon className="w-4 h-4" />
      ) : (
        <ExclamationTriangleIcon className="w-4 h-4" />
      )}
      <p>{message}</p>
    </div>
  );
}

export default FormStatus;
