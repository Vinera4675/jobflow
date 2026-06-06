import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold text-slate-950">JobFlow</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
            Conectando candidatos e empresas com um fluxo simples para publicar
            vagas, enviar candidaturas e acompanhar processos.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
          <Link
            href="/vagas"
            className="transition-colors hover:text-emerald-700"
          >
            Vagas
          </Link>
          <Link
            href="/dashboard"
            className="transition-colors hover:text-emerald-700"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
