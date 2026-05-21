import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JobCard } from "@/components/JobCard";
import {
  employmentTypeOptions,
  workModeOptions,
  type JobFormValues,
} from "@/lib/job-schema";
import { prisma } from "@/lib/prisma";

type JobsPageProps = {
  searchParams: Promise<{
    q?: string;
    workMode?: string;
    employmentType?: string;
    location?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Vagas | JobFlow",
  description: "Veja vagas abertas publicadas por empresas no JobFlow.",
};

export const dynamic = "force-dynamic";

function normalizeParam(value: string | undefined) {
  const normalized = value?.trim();

  return normalized ? normalized : undefined;
}

function getValidWorkMode(value: string | undefined) {
  return workModeOptions.some((option) => option.value === value)
    ? (value as JobFormValues["workMode"])
    : undefined;
}

function getValidEmploymentType(value: string | undefined) {
  return employmentTypeOptions.some((option) => option.value === value)
    ? (value as JobFormValues["employmentType"])
    : undefined;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const query = normalizeParam(params.q);
  const location = normalizeParam(params.location);
  const workMode = getValidWorkMode(params.workMode);
  const employmentType = getValidEmploymentType(params.employmentType);

  const jobs = await prisma.job.findMany({
    where: {
      status: "OPEN",
      ...(query
        ? {
            title: {
              contains: query,
              mode: "insensitive",
            },
          }
        : {}),
      ...(location
        ? {
            location: {
              contains: location,
              mode: "insensitive",
            },
          }
        : {}),
      ...(workMode ? { workMode } : {}),
      ...(employmentType ? { employmentType } : {}),
    },
    include: {
      company: {
        select: {
          companyName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const hasFilters = Boolean(query || location || workMode || employmentType);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Vagas publicas
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Encontre oportunidades para dar o proximo passo.
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
                  Esta listagem mostra vagas abertas cadastradas por empresas no
                  banco de dados do JobFlow.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="text-3xl font-semibold text-slate-950">
                  {jobs.length}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  vagas abertas no momento
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white py-6">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <form
              action="/vagas"
              className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm lg:grid-cols-[1.25fr_1fr_1fr_1fr_auto]"
            >
              <div>
                <label
                  htmlFor="q"
                  className="text-sm font-semibold text-slate-800"
                >
                  Buscar por titulo
                </label>
                <input
                  id="q"
                  name="q"
                  type="search"
                  defaultValue={query ?? ""}
                  placeholder="Ex: Desenvolvedor Front-end"
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="workMode"
                  className="text-sm font-semibold text-slate-800"
                >
                  Modelo
                </label>
                <select
                  id="workMode"
                  name="workMode"
                  defaultValue={workMode ?? ""}
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">Todos</option>
                  {workModeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="employmentType"
                  className="text-sm font-semibold text-slate-800"
                >
                  Tipo
                </label>
                <select
                  id="employmentType"
                  name="employmentType"
                  defaultValue={employmentType ?? ""}
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="">Todos</option>
                  {employmentTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="text-sm font-semibold text-slate-800"
                >
                  Localizacao
                </label>
                <input
                  id="location"
                  name="location"
                  type="search"
                  defaultValue={location ?? ""}
                  placeholder="Ex: Sao Paulo"
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="flex flex-col gap-2 lg:justify-end">
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  Filtrar
                </button>
                {hasFilters ? (
                  <Link
                    href="/vagas"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100"
                  >
                    Limpar
                  </Link>
                ) : null}
              </div>
            </form>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            {jobs.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
                <h2 className="text-xl font-semibold text-slate-950">
                  {hasFilters
                    ? "Nenhuma vaga encontrada"
                    : "Nenhuma vaga aberta ainda"}
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  {hasFilters
                    ? "Ajuste os filtros ou limpe a busca para ver outras oportunidades abertas."
                    : "Assim que uma empresa criar uma vaga com status aberta, ela aparecera nesta pagina publica."}
                </p>
                {hasFilters ? (
                  <Link
                    href="/vagas"
                    className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    Limpar filtros
                  </Link>
                ) : null}
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
