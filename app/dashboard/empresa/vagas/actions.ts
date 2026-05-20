"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  emptyStringToNull,
  jobSchema,
  parseRequirements,
  type JobFormValues,
} from "@/lib/job-schema";
import { requireCurrentDbUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export type JobActionResult = {
  success: boolean;
  message: string;
};

async function getCompanyOwnedJob(jobId: string, userId: string) {
  return prisma.job.findFirst({
    where: {
      id: jobId,
      company: {
        userId,
      },
    },
    select: {
      id: true,
    },
  });
}

export async function createJob(values: JobFormValues): Promise<JobActionResult> {
  const user = await requireCurrentDbUser();

  if (!user.role) {
    redirect("/onboarding");
  }

  if (user.role !== "COMPANY") {
    return {
      success: false,
      message: "Apenas usuarios empresa podem criar vagas.",
    };
  }

  const companyProfile = await prisma.companyProfile.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  if (!companyProfile) {
    return {
      success: false,
      message: "Complete o perfil da empresa antes de criar uma vaga.",
    };
  }

  const parsed = jobSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Revise os campos da vaga.",
    };
  }

  const data = parsed.data;

  await prisma.job.create({
    data: {
      companyId: companyProfile.id,
      title: data.title.trim(),
      description: data.description.trim(),
      requirements: parseRequirements(data.requirements),
      location: data.location.trim(),
      workMode: data.workMode,
      employmentType: data.employmentType,
      salary: emptyStringToNull(data.salary),
      status: "OPEN",
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/empresa/vagas");
  revalidatePath("/vagas");

  return {
    success: true,
    message: "Vaga criada com sucesso.",
  };
}

export async function updateJob(
  jobId: string,
  values: JobFormValues,
): Promise<JobActionResult> {
  const user = await requireCurrentDbUser();

  if (!user.role) {
    redirect("/onboarding");
  }

  if (user.role !== "COMPANY") {
    return {
      success: false,
      message: "Apenas usuarios empresa podem editar vagas.",
    };
  }

  const job = await getCompanyOwnedJob(jobId, user.id);

  if (!job) {
    return {
      success: false,
      message: "Vaga nao encontrada para esta empresa.",
    };
  }

  const parsed = jobSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Revise os campos da vaga.",
    };
  }

  const data = parsed.data;

  await prisma.job.update({
    where: {
      id: job.id,
    },
    data: {
      title: data.title.trim(),
      description: data.description.trim(),
      requirements: parseRequirements(data.requirements),
      location: data.location.trim(),
      workMode: data.workMode,
      employmentType: data.employmentType,
      salary: emptyStringToNull(data.salary),
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/empresa/vagas");
  revalidatePath(`/dashboard/empresa/vagas/${job.id}/editar`);
  revalidatePath(`/dashboard/empresa/vagas/${job.id}/candidatos`);
  revalidatePath("/vagas");
  revalidatePath(`/vagas/${job.id}`);

  return {
    success: true,
    message: "Vaga atualizada com sucesso.",
  };
}

export async function closeJob(jobId: string): Promise<JobActionResult> {
  const user = await requireCurrentDbUser();

  if (!user.role) {
    redirect("/onboarding");
  }

  if (user.role !== "COMPANY") {
    return {
      success: false,
      message: "Apenas usuarios empresa podem fechar vagas.",
    };
  }

  const job = await getCompanyOwnedJob(jobId, user.id);

  if (!job) {
    return {
      success: false,
      message: "Vaga nao encontrada para esta empresa.",
    };
  }

  await prisma.job.update({
    where: {
      id: job.id,
    },
    data: {
      status: "CLOSED",
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/empresa/vagas");
  revalidatePath(`/dashboard/empresa/vagas/${job.id}/editar`);
  revalidatePath(`/dashboard/empresa/vagas/${job.id}/candidatos`);
  revalidatePath("/vagas");
  revalidatePath(`/vagas/${job.id}`);

  return {
    success: true,
    message: "Vaga fechada com sucesso.",
  };
}
