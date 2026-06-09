import Link from "next/link";

export function HeroSection() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mx-auto mb-4 w-fit rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100">
            Vagas e candidaturas em um só lugar
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Oportunidades para candidatos. Mais controle para empresas.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Encontre vagas, acompanhe suas candidaturas e mantenha seu perfil
            profissional atualizado. Para empresas, publique oportunidades e
            gerencie candidatos em um único painel.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/vagas"
              className="inline-flex h-12 w-full items-center justify-center rounded-md bg-emerald-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:w-auto"
            >
              Ver vagas disponíveis
            </Link>
            <Link
              href="/dashboard"
              prefetch={false}
              className="inline-flex h-12 w-full items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
            >
              Acessar minha conta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
