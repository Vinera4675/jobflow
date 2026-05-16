import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { requireCurrentDbUser } from "@/lib/current-user";
import { selectUserRole } from "./actions";

export const metadata: Metadata = {
  title: "Onboarding | JobFlow",
  description: "Escolha o tipo de conta para continuar no JobFlow.",
};

const roleOptions = [
  {
    role: "CANDIDATE",
    title: "Candidato",
    description:
      "Encontre vagas, acompanhe candidaturas e organize sua jornada profissional.",
    highlights: [
      "Buscar oportunidades",
      "Acompanhar status",
      "Completar perfil futuramente",
    ],
    action: "Continuar como candidato",
  },
  {
    role: "COMPANY",
    title: "Empresa",
    description:
      "Publique vagas, acompanhe candidatos e gerencie processos seletivos.",
    highlights: [
      "Publicar vagas futuramente",
      "Visualizar candidaturas",
      "Completar perfil da empresa",
    ],
    action: "Continuar como empresa",
  },
] as const;

export default async function OnboardingPage() {
  const user = await requireCurrentDbUser();

  if (user.role) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Primeiro acesso
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Como voce quer usar o JobFlow?
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Escolha o tipo da sua conta para liberar o dashboard correto.
              Perfis completos de candidato e empresa serao criados em uma
              proxima etapa.
            </p>
          </section>

          <section className="mt-6 grid gap-5 md:grid-cols-2">
            {roleOptions.map((option) => (
              <article
                key={option.role}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  {option.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {option.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {option.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-6 text-slate-700"
                    >
                      <span className="mt-2 h-2 w-2 flex-none rounded-full bg-emerald-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <form action={selectUserRole} className="mt-7">
                  <input type="hidden" name="role" value={option.role} />
                  <button
                    type="submit"
                    className="inline-flex h-11 w-full items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    {option.action}
                  </button>
                </form>
              </article>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
