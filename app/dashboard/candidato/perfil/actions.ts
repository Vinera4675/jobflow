"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  candidateProfileSchema,
  emptyStringToNull,
  parseSkills,
  type CandidateProfileFormInput,
} from "@/lib/candidate-profile-schema";
import { requireCurrentDbUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export type CandidateProfileActionResult = {
  success: boolean;
  message: string;
};

export async function saveCandidateProfile(
  values: CandidateProfileFormInput,
): Promise<CandidateProfileActionResult> {
  const user = await requireCurrentDbUser();

  if (!user.role) {
    redirect("/onboarding");
  }

  if (user.role !== "CANDIDATE") {
    return {
      success: false,
      message: "Apenas usuarios candidatos podem editar este perfil.",
    };
  }

  const parsed = candidateProfileSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Revise os campos do perfil.",
    };
  }

  const data = parsed.data;

  await prisma.candidateProfile.upsert({
    where: {
      userId: user.id,
    },
    update: {
      title: data.title.trim(),
      bio: data.bio.trim(),
      skills: parseSkills(data.skills),
      githubUrl: emptyStringToNull(data.githubUrl),
      linkedinUrl: emptyStringToNull(data.linkedinUrl),
      resumeUrl: emptyStringToNull(data.resumeUrl),
    },
    create: {
      userId: user.id,
      title: data.title.trim(),
      bio: data.bio.trim(),
      skills: parseSkills(data.skills),
      githubUrl: emptyStringToNull(data.githubUrl),
      linkedinUrl: emptyStringToNull(data.linkedinUrl),
      resumeUrl: emptyStringToNull(data.resumeUrl),
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/candidato/perfil");

  return {
    success: true,
    message: "Perfil de candidato salvo com sucesso.",
  };
}
