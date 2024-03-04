"use client";

import { Button } from "@/components/ui/button";
import { signout } from "@/action/signout";

type Props = {};

function Users({}: Props) {
  return (
    <div>
      <label>Users</label>
      <Button onClick={async () => await signout()}>Sign Out</Button>
    </div>
  );
}

export default Users;
