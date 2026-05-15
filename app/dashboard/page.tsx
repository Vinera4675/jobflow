import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Dashboard | JobFlow",
  description: "Área protegida do JobFlow para usuários autenticados.",
};

const dashboardCards = [
  {
    title: "Candidaturas",
    value: "0",
    description: "Suas candidaturas aparecerão aqui nas próximas etapas.",
  },
  {
    title: "Vagas salvas",
    value: "0",
    description: "Em breve você poderá salvar vagas para acompanhar depois.",
  },
  {
    title: "Perfil",
    value: "Pendente",
    description: "Perfis de candidato e empresa ainda serão implementados.",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Área protegida
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-end">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Bem-vindo ao dashboard do JobFlow.
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  Esta página confirma que a autenticação com Clerk está ativa.
                  Por enquanto, ela serve como base para os futuros painéis de
                  candidatos e empresas.
                </p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-sm font-semibold text-emerald-800">
                  Sessão autenticada
                </p>
                <p className="mt-2 text-sm leading-6 text-emerald-900">
                  Se você chegou aqui pelo navegador, o proxy de proteção de
                  rota permitiu o acesso.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-5 md:grid-cols-3">
            {dashboardCards.map((card) => (
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
