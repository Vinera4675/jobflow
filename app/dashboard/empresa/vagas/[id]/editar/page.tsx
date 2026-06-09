import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JobForm } from "@/components/JobForm";
import { requireCurrentDbUser } from "@/lib/current-user";
import { jobStatusLabels } from "@/lib/job-schema";
import { prisma } from "@/lib/prisma";

type EditCompanyJobPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Editar vaga | JobFlow",
  description: "Edite uma vaga criada pela empresa no JobFlow.",
};

export const dynamic = "force-dynamic";

export default async function EditCompanyJobPage({
  params,
}: EditCompanyJobPageProps) {
  const [{ id }, user] = await Promise.all([params, requireCurrentDbUser()]);

  if (!user.role) {
    redirect("/onboarding");
  }

  if (user.role !== "COMPANY") {
    notFound();
  }

  const job = await prisma.job.findFirst({
    where: {
      id,
      company: {
        userId: user.id,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      requirements: true,
      location: true,
      workMode: true,
      employmentType: true,
      salary: true,
      status: true,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
          <section className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Editar vaga
                </p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  {job.title}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  Altere os dados da vaga ou encerre a publicação para remover a
                  oportunidade da listagem pública.
                </p>
              </div>
              <span className="w-fit rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {jobStatusLabels[job.status]}
              </span>
            </div>
          </section>

          <JobForm
            mode="edit"
            jobId={job.id}
            status={job.status}
            defaultValues={{
              title: job.title,
              description: job.description,
              requirements: job.requirements.join("\n"),
              location: job.location,
              workMode: job.workMode,
              employmentType: job.employmentType,
              salary: job.salary ?? "",
            }}
          />

          <div className="mt-5">
            <Link
              href={`/dashboard/empresa/vagas/${job.id}/candidatos`}
              className="text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline"
            >
              Ver candidatos desta vaga
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
