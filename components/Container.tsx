import { PropsWithChildren } from "react";

function Container({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center space-y-2">{children}</div>
    </div>
  );
}

export default Container;
