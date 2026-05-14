import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JobCard } from "@/components/JobCard";
import { jobs } from "@/lib/mock-jobs";

export const metadata: Metadata = {
  title: "Vagas | JobFlow",
  description:
    "Veja vagas mockadas da primeira versão pública do JobFlow.",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Vagas públicas
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Encontre oportunidades para dar o próximo passo.
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
                  Esta listagem usa dados mockados para validar a experiência
                  pública de busca e leitura de vagas antes da integração com
                  banco de dados e autenticação.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="text-3xl font-semibold text-slate-950">
                  {jobs.length}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  vagas disponíveis nesta primeira versão
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-5 px-5 sm:px-6 md:grid-cols-2 lg:px-8">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
