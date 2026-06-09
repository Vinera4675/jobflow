import Link from "next/link";

export function HomeCallToAction() {
  return (
    <section className="border-t border-slate-200 bg-emerald-50">
      <div className="mx-auto w-full max-w-4xl px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Comece agora
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Encontre oportunidades ou publique sua próxima vaga.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Acesse as vagas disponíveis ou entre na sua conta para acompanhar
            candidaturas e gerenciar processos seletivos.
          </p>
        </div>

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
            className="inline-flex h-12 w-full items-center justify-center rounded-md border border-emerald-300 bg-white px-6 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 sm:w-auto"
          >
            Entrar ou criar conta
          </Link>
        </div>
      </div>
    </section>
  );
}
