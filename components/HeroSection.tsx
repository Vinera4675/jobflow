import Link from "next/link";

const featuredJobs = [
  {
    title: "Desenvolvedor Front-end Jr.",
    company: "NovaTech",
    type: "Remoto",
    status: "12 candidatos",
  },
  {
    title: "Estágio Full Stack",
    company: "Flow Labs",
    type: "Híbrido",
    status: "Aberta",
  },
  {
    title: "Analista de Produto",
    company: "PeopleHub",
    type: "Presencial",
    status: "Nova",
  },
];

export function HeroSection() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-4 w-fit rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100">
            Projeto full stack para portfólio
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Conecte candidatos e empresas em um fluxo de contratação simples.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            O JobFlow centraliza vagas, candidaturas e acompanhamento de status
            para criar uma experiência clara para quem busca oportunidades e
            para quem publica posições.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/vagas"
              className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Ver vagas
            </Link>
            <Link
              href="/#perfis"
              className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              Entrar ou cadastrar
            </Link>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-slate-200 pt-6">
            <div>
              <dt className="text-sm text-slate-500">Perfis</dt>
              <dd className="mt-1 text-2xl font-semibold text-slate-950">2</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Fluxo</dt>
              <dd className="mt-1 text-2xl font-semibold text-slate-950">3</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Stack</dt>
              <dd className="mt-1 text-2xl font-semibold text-slate-950">TS</dd>
            </div>
          </dl>
        </div>

        <div
          id="vagas-preview"
          className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-950">
                Vagas em destaque
              </p>
              <p className="text-sm text-slate-500">
                Prévia da experiência inicial
              </p>
            </div>
            <span className="rounded-md bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
              MVP
            </span>
          </div>

          <div className="divide-y divide-slate-200">
            {featuredJobs.map((job) => (
              <article
                key={`${job.title}-${job.company}`}
                className="grid gap-4 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div>
                  <h2 className="text-base font-semibold text-slate-950">
                    {job.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {job.company} · {job.type}
                  </p>
                </div>
                <span className="w-fit rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  {job.status}
                </span>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-2 border-t border-slate-200 bg-slate-50">
            <div className="border-r border-slate-200 p-5">
              <p className="text-2xl font-semibold text-slate-950">24h</p>
              <p className="mt-1 text-sm text-slate-500">
                para acompanhar novas candidaturas
              </p>
            </div>
            <div className="p-5">
              <p className="text-2xl font-semibold text-slate-950">1 painel</p>
              <p className="mt-1 text-sm text-slate-500">
                para organizar vagas e status
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
