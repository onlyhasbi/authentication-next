import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <div className="flex justify-center items-center w-full min-h-screen">{children}</div>;
};

export default Layout;
