import Link from "next/link";
import {
  type Job,
  jobStatusLabels,
  jobTypeLabels,
  workModelLabels,
} from "@/lib/mock-jobs";

type JobDetailsProps = {
  job: Job;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export function JobDetails({ job }: JobDetailsProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-6 sm:px-8 sm:py-8">
        <Link
          href="/vagas"
          className="text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
        >
          Voltar para vagas
        </Link>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{job.company}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {job.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              {job.shortDescription}
            </p>
          </div>

          <a
            href="#candidatar"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-emerald-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Candidatar-se
          </a>
        </div>
      </div>

      <div className="grid gap-8 px-5 py-6 sm:px-8 lg:grid-cols-[1fr_18rem] lg:py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">
              Descrição da vaga
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {job.fullDescription}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">
              Requisitos
            </h2>
            <ul className="mt-4 space-y-3">
              {job.requirements.map((requirement) => (
                <li
                  key={requirement}
                  className="flex gap-3 text-base leading-7 text-slate-700"
                >
                  <span className="mt-3 h-2 w-2 flex-none rounded-full bg-emerald-500" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="candidatar"
            className="rounded-lg border border-emerald-200 bg-emerald-50 p-5"
          >
            <h2 className="text-lg font-semibold text-slate-950">
              Pronto para se candidatar?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Este botão ainda é demonstrativo. A autenticação e o envio real
              da candidatura serão implementados em uma próxima etapa.
            </p>
            <button
              type="button"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Candidatar-se
            </button>
          </section>
        </div>

        <aside className="h-fit rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Resumo
          </h2>
          <dl className="mt-5 space-y-5">
            <div>
              <dt className="text-sm text-slate-500">Empresa</dt>
              <dd className="mt-1 font-semibold text-slate-950">
                {job.company}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Localização</dt>
              <dd className="mt-1 font-semibold text-slate-950">
                {job.location}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Modelo de trabalho</dt>
              <dd className="mt-1 font-semibold text-slate-950">
                {workModelLabels[job.workModel]}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Tipo</dt>
              <dd className="mt-1 font-semibold text-slate-950">
                {jobTypeLabels[job.type]}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Status</dt>
              <dd className="mt-1 font-semibold text-slate-950">
                {jobStatusLabels[job.status]}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Criada em</dt>
              <dd className="mt-1 font-semibold text-slate-950">
                <time dateTime={job.createdAt}>
                  {dateFormatter.format(new Date(`${job.createdAt}T00:00:00`))}
                </time>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  );
}
