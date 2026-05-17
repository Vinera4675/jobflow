import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { requireCurrentDbUser } from "@/lib/current-user";

export const metadata: Metadata = {
  title: "Dashboard | JobFlow",
  description: "Area protegida do JobFlow para usuarios autenticados.",
};

const dashboardContent = {
  CANDIDATE: {
    eyebrow: "Dashboard do candidato",
    title: "Acompanhe sua jornada de candidaturas.",
    description:
      "Este painel sera a base para acompanhar vagas salvas, candidaturas enviadas e status de processos seletivos.",
    statusTitle: "Conta de candidato",
    statusDescription:
      "Seu usuario ja esta sincronizado com o banco e marcado como candidato.",
    cards: [
      {
        title: "Candidaturas",
        value: "0",
        description: "Suas candidaturas aparecerao aqui nas proximas etapas.",
      },
      {
        title: "Vagas salvas",
        value: "0",
        description: "Em breve voce podera salvar vagas para acompanhar depois.",
      },
      {
        title: "Perfil",
        value: "Pendente",
        description: "O perfil completo de candidato ainda sera implementado.",
      },
    ],
  },
  COMPANY: {
    eyebrow: "Dashboard da empresa",
    title: "Gerencie vagas e candidaturas recebidas.",
    description:
      "Este painel sera a base para publicar vagas, revisar candidatos e acompanhar o andamento dos processos.",
    statusTitle: "Conta de empresa",
    statusDescription:
      "Seu usuario ja esta sincronizado com o banco e marcado como empresa.",
    cards: [
      {
        title: "Vagas publicadas",
        value: "0",
        description: "As vagas criadas pela empresa aparecerao aqui.",
      },
      {
        title: "Candidatos",
        value: "0",
        description: "As candidaturas recebidas serao listadas futuramente.",
      },
      {
        title: "Perfil",
        value: "Pendente",
        description: "O perfil completo da empresa ainda sera implementado.",
      },
    ],
  },
};

export default async function DashboardPage() {
  const user = await requireCurrentDbUser();

  if (!user.role) {
    redirect("/onboarding");
  }

  const content = dashboardContent[user.role];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {content.eyebrow}
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-end">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  {content.title}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  {content.description}
                </p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-sm font-semibold text-emerald-800">
                  {content.statusTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-emerald-900">
                  {content.statusDescription}
                </p>
                {user.role === "CANDIDATE" ? (
                  <Link
                    href="/dashboard/candidato/perfil"
                    className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                  >
                    Editar perfil
                  </Link>
                ) : null}
                {user.role === "COMPANY" ? (
                  <Link
                    href="/dashboard/empresa/perfil"
                    className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                  >
                    Editar perfil
                  </Link>
                ) : null}
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-5 md:grid-cols-3">
            {content.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">
                  {card.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {card.description}
                </p>
              </article>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
