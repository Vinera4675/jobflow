import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { requireCurrentDbUser } from "@/lib/current-user";
import {
  employmentTypeLabels,
  jobStatusLabels,
  workModeLabels,
} from "@/lib/job-schema";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Vagas da empresa | JobFlow",
  description: "Gerencie as vagas criadas pela empresa no JobFlow.",
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default async function CompanyJobsPage() {
  const user = await requireCurrentDbUser();

  if (!user.role) {
    redirect("/onboarding");
  }

  if (user.role !== "COMPANY") {
    notFound();
  }

  const companyProfile = await prisma.companyProfile.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      jobs: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Vagas da empresa
                </p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Gerencie as vagas publicadas.
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  Esta listagem mostra apenas as vagas vinculadas ao perfil da
                  empresa logada.
                </p>
              </div>

              {companyProfile ? (
                <Link
                  href="/dashboard/empresa/vagas/nova"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  Nova vaga
                </Link>
              ) : null}
            </div>
          </section>

          {!companyProfile ? (
            <section className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">
                Complete o perfil da empresa primeiro
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">
                Antes de criar vagas, voce precisa cadastrar os dados principais
                da empresa. Assim cada vaga fica vinculada ao perfil correto.
              </p>
              <Link
                href="/dashboard/empresa/perfil"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Criar perfil da empresa
              </Link>
            </section>
          ) : null}

          {companyProfile ? (
            <section className="mt-6">
              {companyProfile.jobs.length === 0 ? (
                <div className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
                  <h2 className="text-xl font-semibold text-slate-950">
                    Nenhuma vaga criada ainda
                  </h2>
                  <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    Crie a primeira vaga da empresa para comecar a estruturar o
                    fluxo de candidaturas.
                  </p>
                  <Link
                    href="/dashboard/empresa/vagas/nova"
                    className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    Criar primeira vaga
                  </Link>
                </div>
              ) : (
                <div className="grid gap-5">
                  {companyProfile.jobs.map((job) => (
                    <article
                      key={job.id}
                      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                              {jobStatusLabels[job.status]}
                            </span>
                            <span className="rounded-md bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
                              {workModeLabels[job.workMode]}
                            </span>
                            <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                              {employmentTypeLabels[job.employmentType]}
                            </span>
                          </div>
                          <h2 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
                            {job.title}
                          </h2>
                          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                            {job.description}
                          </p>
                        </div>

                        <div className="shrink-0 text-sm text-slate-500 md:text-right">
                          <p>{job.location}</p>
                          {job.salary ? <p className="mt-1">{job.salary}</p> : null}
                          <time dateTime={job.createdAt.toISOString()}>
                            {dateFormatter.format(job.createdAt)}
                          </time>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
