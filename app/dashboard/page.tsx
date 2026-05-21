import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { requireCurrentDbUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Dashboard | JobFlow",
  description: "Area protegida do JobFlow para usuarios autenticados.",
};

export const dynamic = "force-dynamic";

type DashboardCard = {
  title: string;
  value: number;
  description: string;
};

async function getCandidateDashboardData(userId: string) {
  const candidateProfile = await prisma.candidateProfile.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!candidateProfile) {
    return {
      hasProfile: false,
      cards: [
        {
          title: "Total de candidaturas",
          value: 0,
          description: "Crie seu perfil e candidate-se a vagas abertas.",
        },
        {
          title: "Em analise",
          value: 0,
          description: "Candidaturas marcadas como REVISANDO pela empresa.",
        },
        {
          title: "Aprovadas",
          value: 0,
          description: "Candidaturas aprovadas aparecerao aqui.",
        },
      ] satisfies DashboardCard[],
    };
  }

  const [totalApplications, reviewingApplications, approvedApplications] =
    await Promise.all([
      prisma.application.count({
        where: {
          candidateId: candidateProfile.id,
        },
      }),
      prisma.application.count({
        where: {
          candidateId: candidateProfile.id,
          status: "REVIEWING",
        },
      }),
      prisma.application.count({
        where: {
          candidateId: candidateProfile.id,
          status: "APPROVED",
        },
      }),
    ]);

  return {
    hasProfile: true,
    cards: [
      {
        title: "Total de candidaturas",
        value: totalApplications,
        description: "Candidaturas enviadas para vagas no JobFlow.",
      },
      {
        title: "Em analise",
        value: reviewingApplications,
        description: "Processos que a empresa marcou como REVISANDO.",
      },
      {
        title: "Aprovadas",
        value: approvedApplications,
        description: "Candidaturas marcadas como APROVADO.",
      },
    ] satisfies DashboardCard[],
  };
}

async function getCompanyDashboardData(userId: string) {
  const companyProfile = await prisma.companyProfile.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!companyProfile) {
    return {
      hasProfile: false,
      cards: [
        {
          title: "Total de vagas",
          value: 0,
          description: "Crie o perfil da empresa antes de publicar vagas.",
        },
        {
          title: "Vagas abertas",
          value: 0,
          description: "Vagas OPEN aparecem na listagem publica.",
        },
        {
          title: "Candidaturas recebidas",
          value: 0,
          description: "Candidaturas recebidas aparecerao aqui.",
        },
      ] satisfies DashboardCard[],
    };
  }

  const [totalJobs, openJobs, receivedApplications] = await Promise.all([
    prisma.job.count({
      where: {
        companyId: companyProfile.id,
      },
    }),
    prisma.job.count({
      where: {
        companyId: companyProfile.id,
        status: "OPEN",
      },
    }),
    prisma.application.count({
      where: {
        job: {
          companyId: companyProfile.id,
        },
      },
    }),
  ]);

  return {
    hasProfile: true,
    cards: [
      {
        title: "Total de vagas",
        value: totalJobs,
        description: "Vagas criadas pela empresa logada.",
      },
      {
        title: "Vagas abertas",
        value: openJobs,
        description: "Vagas OPEN visiveis para candidatos.",
      },
      {
        title: "Candidaturas recebidas",
        value: receivedApplications,
        description: "Total recebido em todas as vagas da empresa.",
      },
    ] satisfies DashboardCard[],
  };
}

function StatsGrid({ cards }: { cards: DashboardCard[] }) {
  return (
    <section className="mt-6 grid gap-5 md:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.title}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">{card.title}</p>
          <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            {card.value}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {card.description}
          </p>
        </article>
      ))}
    </section>
  );
}

export default async function DashboardPage() {
  const user = await requireCurrentDbUser();

  if (!user.role) {
    redirect("/onboarding");
  }

  const isCandidate = user.role === "CANDIDATE";
  const data = isCandidate
    ? await getCandidateDashboardData(user.id)
    : await getCompanyDashboardData(user.id);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {isCandidate
                    ? "Dashboard do candidato"
                    : "Dashboard da empresa"}
                </p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  {isCandidate
                    ? "Acompanhe suas candidaturas."
                    : "Gerencie vagas e candidatos."}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  {isCandidate
                    ? "Veja seus numeros principais e acesse rapidamente as vagas abertas e seu perfil profissional."
                    : "Monitore vagas criadas, oportunidades abertas e candidaturas recebidas pela empresa."}
                </p>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-sm font-semibold text-emerald-800">
                  {isCandidate ? "Conta de candidato" : "Conta de empresa"}
                </p>
                <p className="mt-2 text-sm leading-6 text-emerald-900">
                  {data.hasProfile
                    ? "Perfil criado e pronto para continuar o fluxo."
                    : "Complete seu perfil para liberar melhor o fluxo do dashboard."}
                </p>
                {isCandidate ? (
                  <div className="mt-5 flex flex-col gap-2">
                    <Link
                      href="/vagas"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                    >
                      Buscar vagas
                    </Link>
                    <Link
                      href="/dashboard/candidato/perfil"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-emerald-300 bg-white px-4 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
                    >
                      Editar perfil
                    </Link>
                    <Link
                      href="/dashboard/candidato/candidaturas"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-emerald-300 bg-white px-4 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
                    >
                      Minhas candidaturas
                    </Link>
                  </div>
                ) : (
                  <div className="mt-5 flex flex-col gap-2">
                    <Link
                      href="/dashboard/empresa/vagas/nova"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                    >
                      Criar vaga
                    </Link>
                    <Link
                      href="/dashboard/empresa/vagas"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-emerald-300 bg-white px-4 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
                    >
                      Ver vagas da empresa
                    </Link>
                    <Link
                      href="/dashboard/empresa/perfil"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-emerald-300 bg-white px-4 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
                    >
                      Editar perfil
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>

          <StatsGrid cards={data.cards} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
