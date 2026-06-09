"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  applicationSchema,
  emptyStringToNull,
  type ApplicationFormValues,
} from "@/lib/application-schema";
import { getCurrentDbUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export type ApplicationActionResult = {
  success: boolean;
  message: string;
};

export async function applyToJob(
  values: ApplicationFormValues,
): Promise<ApplicationActionResult> {
  const user = await getCurrentDbUser();

  if (!user) {
    return {
      success: false,
      message: "Entre na sua conta para se candidatar a esta vaga.",
    };
  }

  if (!user.role) {
    redirect("/onboarding");
  }

  if (user.role !== "CANDIDATE") {
    return {
      success: false,
      message: "Contas de empresa não podem se candidatar a vagas.",
    };
  }

  const parsed = applicationSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message:
        parsed.error.issues[0]?.message ?? "Revise a mensagem da candidatura.",
    };
  }

  const data = parsed.data;

  const candidateProfile = await prisma.candidateProfile.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  if (!candidateProfile) {
    return {
      success: false,
      message: "Complete seu perfil de candidato antes de se candidatar.",
    };
  }

  const job = await prisma.job.findFirst({
    where: {
      id: data.jobId,
      status: "OPEN",
    },
    select: {
      id: true,
    },
  });

  if (!job) {
    return {
      success: false,
      message: "Esta vaga não existe ou não está mais aberta.",
    };
  }

  const existingApplication = await prisma.application.findUnique({
    where: {
      jobId_candidateId: {
        jobId: data.jobId,
        candidateId: candidateProfile.id,
      },
    },
    select: {
      id: true,
    },
  });

  if (existingApplication) {
    return {
      success: false,
      message: "Você já enviou uma candidatura para esta vaga.",
    };
  }

  try {
    await prisma.application.create({
      data: {
        jobId: data.jobId,
        candidateId: candidateProfile.id,
        status: "SENT",
        message: emptyStringToNull(data.message),
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Você já enviou uma candidatura para esta vaga.",
      };
    }

    throw error;
  }

  revalidatePath(`/vagas/${data.jobId}`);
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Candidatura enviada com sucesso.",
  };
}
