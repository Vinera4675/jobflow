import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JobCard } from "@/components/JobCard";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Vagas | JobFlow",
  description: "Veja vagas abertas publicadas por empresas no JobFlow.",
};

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    where: {
      status: "OPEN",
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

        <section className="py-12 sm:py-16">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            {jobs.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
                <h2 className="text-xl font-semibold text-slate-950">
                  Nenhuma vaga aberta ainda
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Assim que uma empresa criar uma vaga com status aberta, ela
                  aparecera nesta pagina publica.
                </p>
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
