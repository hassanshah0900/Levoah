import React, { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return <div className="max-w-[1100px] mx-auto px-2 md:px-4">{children}</div>;
}
