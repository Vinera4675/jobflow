import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JobForm } from "@/components/JobForm";
import { requireCurrentDbUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Nova vaga | JobFlow",
  description: "Crie uma nova vaga para a empresa no JobFlow.",
};

export default async function NewCompanyJobPage() {
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
    select: {
      id: true,
      companyName: true,
    },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
          <section className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Nova vaga
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Publique uma oportunidade.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Preencha os dados principais da vaga para receber candidaturas de
              profissionais interessados.
            </p>
          </section>

          {!companyProfile ? (
            <section className="rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">
                Complete o perfil da empresa primeiro
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">
                Voce precisa criar um perfil de empresa antes de publicar vagas.
              </p>
              <Link
                href="/dashboard/empresa/perfil"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Criar perfil da empresa
              </Link>
            </section>
          ) : (
            <JobForm />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
