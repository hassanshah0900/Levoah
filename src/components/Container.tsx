import React, { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return <div className="max-w-[1100px] mx-auto px-5">{children}</div>;
}
