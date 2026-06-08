"use client";

import { useClerk } from "@clerk/nextjs";
import type { ReactNode } from "react";

type ClerkAuthButtonProps = {
  action: "signIn" | "signUp";
  children: ReactNode;
  className: string;
  forceRedirectUrl: string;
};

export function ClerkAuthButton({
  action,
  children,
  className,
  forceRedirectUrl,
}: ClerkAuthButtonProps) {
  const clerk = useClerk();

  function handleClick() {
    if (action === "signIn") {
      clerk.openSignIn({
        forceRedirectUrl,
      });

      return;
    }

    clerk.openSignUp({
      forceRedirectUrl,
    });
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
