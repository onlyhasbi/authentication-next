import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex justify-center items-center w-full h-full">
      {children}
    </main>
  );
};

export default Layout;
