import { auth } from "@/auth";
import React from "react";

type Props = {};

const Settings = async (props: Props) => {
  const session = await auth();
  return (
    <>
      <div>Settings</div>
      <div>{JSON.stringify(session)}</div>
    </>
  );
};

export default Settings;
