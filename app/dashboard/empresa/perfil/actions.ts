"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  companyProfileSchema,
  emptyStringToNull,
  type CompanyProfileFormInput,
} from "@/lib/company-profile-schema";
import { requireCurrentDbUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export type CompanyProfileActionResult = {
  success: boolean;
  message: string;
};

export async function saveCompanyProfile(
  values: CompanyProfileFormInput,
): Promise<CompanyProfileActionResult> {
  const user = await requireCurrentDbUser();

  if (!user.role) {
    redirect("/onboarding");
  }

  if (user.role !== "COMPANY") {
    return {
      success: false,
      message: "Apenas usuarios empresa podem editar este perfil.",
    };
  }

  const parsed = companyProfileSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Revise os campos do perfil.",
    };
  }

  const data = parsed.data;

  await prisma.companyProfile.upsert({
    where: {
      userId: user.id,
    },
    update: {
      companyName: data.companyName.trim(),
      description: data.description.trim(),
      website: emptyStringToNull(data.website),
      location: data.location.trim(),
    },
    create: {
      userId: user.id,
      companyName: data.companyName.trim(),
      description: data.description.trim(),
      website: emptyStringToNull(data.website),
      location: data.location.trim(),
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/empresa/perfil");

  return {
    success: true,
    message: "Perfil de empresa salvo com sucesso.",
  };
}
