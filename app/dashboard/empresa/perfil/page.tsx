import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CompanyProfileForm } from "@/components/CompanyProfileForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { requireCurrentDbUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Perfil da empresa | JobFlow",
  description: "Crie ou edite o perfil da empresa no JobFlow.",
};

export default async function CompanyProfilePage() {
  const user = await requireCurrentDbUser();

  if (!user.role) {
    redirect("/onboarding");
  }

  if (user.role !== "COMPANY") {
    notFound();
  }

  const profile = await prisma.companyProfile.findUnique({
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
              Perfil da empresa
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Complete as informacoes da empresa.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Esta tela salva os dados principais da empresa no banco. A criacao
              de vagas sera conectada em uma proxima etapa.
            </p>
          </section>

          <CompanyProfileForm
            hasProfile={Boolean(profile)}
            defaultValues={{
              companyName: profile?.companyName ?? "",
              description: profile?.description ?? "",
              website: profile?.website ?? "",
              location: profile?.location ?? "",
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
