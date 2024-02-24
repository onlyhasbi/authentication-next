import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

function Redirect({ href, label }: Props) {
  return (
    <Button className="w-full text-sm text-center" variant="link">
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export default Redirect;
