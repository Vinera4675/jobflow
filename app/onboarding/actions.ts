"use server";

import { redirect } from "next/navigation";
import { requireCurrentDbUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

const allowedRoles = ["CANDIDATE", "COMPANY"] as const;

type UserRoleInput = (typeof allowedRoles)[number];

function isUserRoleInput(role: FormDataEntryValue | null): role is UserRoleInput {
  return (
    typeof role === "string" &&
    allowedRoles.includes(role as UserRoleInput)
  );
}

export async function selectUserRole(formData: FormData) {
  const role = formData.get("role");

  if (!isUserRoleInput(role)) {
    throw new Error("Tipo de usuario invalido.");
  }

  const user = await requireCurrentDbUser();

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      role,
    },
  });

  redirect("/dashboard");
}
