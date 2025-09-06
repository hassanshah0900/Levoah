"use client";

import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function DashboardLoginPage() {
  const { push } = useRouter();
  const { isSignedIn, user } = useUser();
  if (isSignedIn) {
    if (user.publicMetadata.user_role === "admin") push("/dashboard/products");
    else push("/");
  }
  return (
    <div className="flex justify-center items-center pt-20">
      <SignIn forceRedirectUrl={"/dashboard/products"} />
    </div>
  );
}
