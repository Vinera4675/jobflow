import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

type ClerkUser = NonNullable<Awaited<ReturnType<typeof currentUser>>>;

function getPrimaryEmail(
  emailAddresses: ClerkUser["emailAddresses"],
  primaryEmailAddressId: string | null | undefined,
) {
  return (
    emailAddresses.find((email) => email.id === primaryEmailAddressId)
      ?.emailAddress ??
    emailAddresses[0]?.emailAddress ??
    null
  );
}

function getDisplayName(clerkUser: ClerkUser, email: string) {
  const fullName = [clerkUser.firstName, clerkUser.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return fullName || clerkUser.username || email.split("@")[0] || "Usuario";
}

export async function getCurrentDbUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const email = getPrimaryEmail(
    clerkUser.emailAddresses,
    clerkUser.primaryEmailAddressId,
  );

  if (!email) {
    throw new Error("O usuario autenticado no Clerk nao possui email.");
  }

  const name = getDisplayName(clerkUser, email);

  return prisma.user.upsert({
    where: {
      clerkId: userId,
    },
    update: {
      name,
      email,
    },
    create: {
      clerkId: userId,
      name,
      email,
    },
  });
}

export async function requireCurrentDbUser() {
  const user = await getCurrentDbUser();

  if (!user) {
    redirect("/");
  }

  return user;
}
