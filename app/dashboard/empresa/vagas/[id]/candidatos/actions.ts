"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import {
  applicationStatusSchema,
  type ApplicationStatusValue,
} from "@/lib/application-schema";
import { requireCurrentDbUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export type UpdateApplicationStatusResult = {
  success: boolean;
  message: string;
  status?: ApplicationStatusValue;
};

type UpdateApplicationStatusInput = {
  applicationId: string;
  jobId: string;
  status: ApplicationStatusValue;
};

export async function updateApplicationStatus({
  applicationId,
  jobId,
  status,
}: UpdateApplicationStatusInput): Promise<UpdateApplicationStatusResult> {
  const user = await requireCurrentDbUser();

  if (!user.role) {
    redirect("/onboarding");
  }

  if (user.role !== "COMPANY") {
    notFound();
  }

  const parsedStatus = applicationStatusSchema.safeParse(status);

  if (!parsedStatus.success) {
    return {
      success: false,
      message: "Status de candidatura invalido.",
    };
  }

  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
      jobId,
      job: {
        company: {
          userId: user.id,
        },
      },
    },
    select: {
      id: true,
    },
  });

  if (!application) {
    return {
      success: false,
      message: "Candidatura nao encontrada para esta empresa.",
    };
  }

  const updatedApplication = await prisma.application.update({
    where: {
      id: application.id,
    },
    data: {
      status: parsedStatus.data,
    },
    select: {
      status: true,
    },
  });

  revalidatePath(`/dashboard/empresa/vagas/${jobId}/candidatos`);
  revalidatePath("/dashboard/empresa/vagas");
  revalidatePath("/dashboard/candidato/candidaturas");

  return {
    success: true,
    message: "Status da candidatura atualizado.",
    status: updatedApplication.status,
  };
}
