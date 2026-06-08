"use client";

import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";

export function HeaderAuth() {
  const clerk = useClerk();
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div className="h-10 w-28 rounded-md bg-slate-100" />;
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          prefetch={false}
          className="hidden rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:inline-flex"
        >
          Dashboard
        </Link>
        <UserButton />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => clerk.openSignIn({ forceRedirectUrl: "/dashboard" })}
        className="hidden rounded-md px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:inline-flex"
      >
        Entrar
      </button>
      <button
        type="button"
        onClick={() => clerk.openSignUp({ forceRedirectUrl: "/dashboard" })}
        className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        Cadastrar
      </button>
    </div>
  );
}
