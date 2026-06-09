import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ApplicationStatusForm } from "@/components/ApplicationStatusForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { applicationStatusLabels } from "@/lib/application-schema";
import { requireCurrentDbUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

type CompanyJobCandidatesPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Candidatos da vaga | JobFlow",
  description: "Veja os candidatos inscritos em uma vaga da empresa.",
};

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default async function CompanyJobCandidatesPage({
  params,
}: CompanyJobCandidatesPageProps) {
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
      applications: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          message: true,
          status: true,
          createdAt: true,
          candidate: {
            select: {
              title: true,
              bio: true,
              skills: true,
              githubUrl: true,
              linkedinUrl: true,
              resumeUrl: true,
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Candidatos inscritos
                </p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  {job.title}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  Veja os candidatos que enviaram candidatura para esta vaga e
                  avalie as informações principais de cada perfil.
                </p>
              </div>
              <Link
                href="/dashboard/empresa/vagas"
                className="inline-flex h-11 w-fit items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
              >
                Voltar para vagas
              </Link>
            </div>
          </section>

          {job.applications.length === 0 ? (
            <section className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">
                Nenhum candidato inscrito ainda
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Quando candidatos enviarem candidatura para esta vaga, eles
                aparecerão aqui com perfil, mensagem, status e data de envio.
              </p>
              <Link
                href={`/vagas/${job.id}`}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Ver vaga pública
              </Link>
            </section>
          ) : (
            <section className="mt-6 grid gap-5">
              {job.applications.map((application) => (
                <article
                  key={application.id}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {application.candidate.user.email}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                        {application.candidate.user.name}
                      </h2>
                      <p className="mt-2 text-sm font-semibold text-emerald-700">
                        {application.candidate.title}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-2 lg:items-end">
                      <span className="w-fit rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                        {applicationStatusLabels[application.status]}
                      </span>
                      <time
                        dateTime={application.createdAt.toISOString()}
                        className="text-sm text-slate-500"
                      >
                        {dateFormatter.format(application.createdAt)}
                      </time>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_18rem]">
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-sm font-semibold text-slate-800">
                          Bio
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {application.candidate.bio}
                        </p>
                      </section>

                      <section>
                        <h3 className="text-sm font-semibold text-slate-800">
                          Skills
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {application.candidate.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h3 className="text-sm font-semibold text-slate-800">
                          Mensagem enviada
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {application.message ??
                            "O candidato não enviou uma mensagem nesta candidatura."}
                        </p>
                      </section>
                    </div>

                    <aside className="h-fit rounded-lg border border-slate-200 bg-slate-50 p-5">
                      <ApplicationStatusForm
                        applicationId={application.id}
                        jobId={job.id}
                        initialStatus={application.status}
                      />

                      <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Links
                      </h3>
                      <div className="mt-5 grid gap-3">
                        {application.candidate.githubUrl ? (
                          <a
                            href={application.candidate.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline"
                          >
                            GitHub
                          </a>
                        ) : (
                          <p className="text-sm text-slate-500">
                            GitHub não informado
                          </p>
                        )}

                        {application.candidate.linkedinUrl ? (
                          <a
                            href={application.candidate.linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline"
                          >
                            LinkedIn
                          </a>
                        ) : (
                          <p className="text-sm text-slate-500">
                            LinkedIn não informado
                          </p>
                        )}

                        {application.candidate.resumeUrl ? (
                          <a
                            href={application.candidate.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline"
                          >
                            Currículo
                          </a>
                        ) : (
                          <p className="text-sm text-slate-500">
                            Currículo não informado
                          </p>
                        )}
                      </div>
                    </aside>
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
