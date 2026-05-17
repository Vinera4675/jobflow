import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CandidateProfileForm } from "@/components/CandidateProfileForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { requireCurrentDbUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Perfil do candidato | JobFlow",
  description: "Crie ou edite seu perfil de candidato no JobFlow.",
};

export default async function CandidateProfilePage() {
  const user = await requireCurrentDbUser();

  if (!user.role) {
    redirect("/onboarding");
  }

  if (user.role !== "CANDIDATE") {
    notFound();
  }

  const profile = await prisma.candidateProfile.findUnique({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
          <section className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Perfil do candidato
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Complete suas informacoes profissionais.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Esta tela salva os dados principais do seu perfil no banco. Ainda
              nao ha candidatura real conectada, mas a base para o fluxo do
              candidato ja fica pronta.
            </p>
          </section>

          <CandidateProfileForm
            hasProfile={Boolean(profile)}
            defaultValues={{
              title: profile?.title ?? "",
              bio: profile?.bio ?? "",
              skills: profile?.skills.join(", ") ?? "",
              githubUrl: profile?.githubUrl ?? "",
              linkedinUrl: profile?.linkedinUrl ?? "",
              resumeUrl: profile?.resumeUrl ?? "",
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
