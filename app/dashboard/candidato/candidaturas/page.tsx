import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { applicationStatusLabels } from "@/lib/application-schema";
import { requireCurrentDbUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Minhas candidaturas | JobFlow",
  description: "Acompanhe suas candidaturas enviadas no JobFlow.",
};

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default async function CandidateApplicationsPage() {
  const user = await requireCurrentDbUser();

  if (!user.role) {
    redirect("/onboarding");
  }

  if (user.role !== "CANDIDATE") {
    notFound();
  }

  const candidateProfile = await prisma.candidateProfile.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      applications: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          status: true,
          message: true,
          createdAt: true,
          job: {
            select: {
              id: true,
              title: true,
              status: true,
              company: {
                select: {
                  companyName: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const applications = candidateProfile?.applications ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Área do candidato
                </p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Minhas candidaturas
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  Acompanhe as vagas para as quais você se candidatou e o status
                  atual de cada processo.
                </p>
              </div>
              <Link
                href="/vagas"
                className="inline-flex h-11 w-fit items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Ver vagas abertas
              </Link>
            </div>
          </section>

          {applications.length === 0 ? (
            <section className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">
                Nenhuma candidatura enviada ainda
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Quando você se candidatar a uma vaga, ela aparecerá aqui com a
                mensagem enviada, data e status do processo.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/vagas"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  Procurar vagas
                </Link>
                <Link
                  href="/dashboard/candidato/perfil"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  Editar perfil
                </Link>
              </div>
            </section>
          ) : (
            <section className="mt-6 grid gap-5">
              {applications.map((application) => (
                <article
                  key={application.id}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {application.job.company.companyName}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                        {application.job.title}
                      </h2>
                    </div>
                    <span className="w-fit rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                      {applicationStatusLabels[application.status]}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_14rem] lg:items-end">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Mensagem enviada
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {application.message ??
                          "Nenhuma mensagem foi enviada nesta candidatura."}
                      </p>
                    </div>
                    <div className="lg:text-right">
                      <p className="text-sm text-slate-500">
                        Candidatura enviada em
                      </p>
                      <time
                        dateTime={application.createdAt.toISOString()}
                        className="mt-1 block text-sm font-semibold text-slate-950"
                      >
                        {dateFormatter.format(application.createdAt)}
                      </time>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5">
                    {application.job.status === "OPEN" ? (
                      <Link
                        href={`/vagas/${application.job.id}`}
                        className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                      >
                        Ver detalhes da vaga
                      </Link>
                    ) : (
                      <span className="inline-flex h-11 items-center rounded-md bg-slate-100 px-4 text-sm font-semibold text-slate-600">
                        Vaga encerrada
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
