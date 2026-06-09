import Link from "next/link";
import { ApplicationForm } from "@/components/ApplicationForm";
import { ClerkAuthButton } from "@/components/ClerkAuthButton";
import { applicationStatusLabels } from "@/lib/application-schema";
import {
  employmentTypeLabels,
  jobStatusLabels,
  workModeLabels,
} from "@/lib/job-schema";

export type JobApplicationState =
  | { kind: "signedOut" }
  | { kind: "needsOnboarding" }
  | { kind: "company" }
  | { kind: "missingCandidateProfile" }
  | {
      kind: "alreadyApplied";
      status: keyof typeof applicationStatusLabels;
      createdAt: Date;
    }
  | { kind: "canApply" };

type JobDetailsProps = {
  job: {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    location: string;
    workMode: keyof typeof workModeLabels;
    employmentType: keyof typeof employmentTypeLabels;
    salary: string | null;
    status: keyof typeof jobStatusLabels;
    createdAt: Date;
    company: {
      companyName: string;
      description: string;
      location: string;
      website: string | null;
    };
  };
  applicationState: JobApplicationState;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function getExcerpt(description: string) {
  if (description.length <= 180) {
    return description;
  }

  return `${description.slice(0, 177).trim()}...`;
}

function ApplicationSection({
  jobId,
  state,
}: {
  jobId: string;
  state: JobApplicationState;
}) {
  if (state.kind === "signedOut") {
    return (
      <section
        id="candidatar"
        className="rounded-lg border border-emerald-200 bg-emerald-50 p-5"
      >
        <h2 className="text-lg font-semibold text-slate-950">
          Entre para se candidatar
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Você precisa estar logado como candidato para enviar uma candidatura
          para esta vaga.
        </p>
        <ClerkAuthButton
          action="signIn"
          forceRedirectUrl={`/vagas/${jobId}`}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:w-auto"
        >
          Entrar para se candidatar
        </ClerkAuthButton>
      </section>
    );
  }

  if (state.kind === "needsOnboarding") {
    return (
      <section
        id="candidatar"
        className="rounded-lg border border-amber-200 bg-amber-50 p-5"
      >
        <h2 className="text-lg font-semibold text-slate-950">
          Escolha seu tipo de conta
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Antes de se candidatar, informe se você quer usar o JobFlow como
          candidato ou empresa.
        </p>
        <Link
          href="/onboarding"
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:w-auto"
        >
          Configurar minha conta
        </Link>
      </section>
    );
  }

  if (state.kind === "company") {
    return (
      <section
        id="candidatar"
        className="rounded-lg border border-amber-200 bg-amber-50 p-5"
      >
        <h2 className="text-lg font-semibold text-slate-950">
          Empresas não podem se candidatar
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Esta conta está configurada como empresa. Use o painel para publicar e
          gerenciar vagas.
        </p>
        <Link
          href="/dashboard/empresa/vagas"
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:w-auto"
        >
          Ver vagas da empresa
        </Link>
      </section>
    );
  }

  if (state.kind === "missingCandidateProfile") {
    return (
      <section
        id="candidatar"
        className="rounded-lg border border-amber-200 bg-amber-50 p-5"
      >
        <h2 className="text-lg font-semibold text-slate-950">
          Complete seu perfil de candidato
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Para enviar candidaturas, primeiro cadastre suas informações
          profissionais no perfil de candidato.
        </p>
        <Link
          href="/dashboard/candidato/perfil"
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:w-auto"
        >
          Criar perfil de candidato
        </Link>
      </section>
    );
  }

  if (state.kind === "alreadyApplied") {
    return (
      <section
        id="candidatar"
        className="rounded-lg border border-emerald-200 bg-emerald-50 p-5"
      >
        <h2 className="text-lg font-semibold text-slate-950">
          Candidatura já enviada
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Você se candidatou em{" "}
          <time dateTime={state.createdAt.toISOString()}>
            {dateFormatter.format(state.createdAt)}
          </time>
          . Status atual:{" "}
          <span className="font-semibold text-emerald-800">
            {applicationStatusLabels[state.status]}
          </span>
          .
        </p>
      </section>
    );
  }

  return (
    <section
      id="candidatar"
      className="rounded-lg border border-emerald-200 bg-emerald-50 p-5"
    >
      <h2 className="text-lg font-semibold text-slate-950">
        Enviar candidatura
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        Inclua uma mensagem opcional para contextualizar seu interesse na vaga.
      </p>
      <div className="mt-5">
        <ApplicationForm jobId={jobId} />
      </div>
    </section>
  );
}

export function JobDetails({ job, applicationState }: JobDetailsProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-6 sm:px-8 sm:py-8">
        <Link
          href="/vagas"
          className="text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
        >
          Voltar para vagas
        </Link>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-500">
              {job.company.companyName}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {job.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              {getExcerpt(job.description)}
            </p>
          </div>

          <a
            href="#candidatar"
            className="inline-flex h-12 w-full shrink-0 items-center justify-center rounded-md bg-emerald-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:w-auto"
          >
            Candidatar-se
          </a>
        </div>
      </div>

      <div className="grid gap-8 px-5 py-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">
              Descrição da vaga
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              {job.description}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-950">
              Requisitos
            </h2>
            <ul className="mt-4 max-w-3xl space-y-3">
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

          <section>
            <h2 className="text-xl font-semibold text-slate-950">
              Sobre a empresa
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              {job.company.description}
            </p>
          </section>

          <ApplicationSection jobId={job.id} state={applicationState} />
        </div>

        <aside className="h-fit rounded-lg border border-slate-200 bg-slate-50 p-5 lg:sticky lg:top-24">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Resumo
          </h2>
          <dl className="mt-5 space-y-5">
            <div>
              <dt className="text-sm text-slate-500">Empresa</dt>
              <dd className="mt-1 font-semibold text-slate-950">
                {job.company.companyName}
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
                {workModeLabels[job.workMode]}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Tipo</dt>
              <dd className="mt-1 font-semibold text-slate-950">
                {employmentTypeLabels[job.employmentType]}
              </dd>
            </div>
            {job.salary ? (
              <div>
                <dt className="text-sm text-slate-500">Salário</dt>
                <dd className="mt-1 font-semibold text-slate-950">
                  {job.salary}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="text-sm text-slate-500">Status</dt>
              <dd className="mt-1 font-semibold text-slate-950">
                {jobStatusLabels[job.status]}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Criada em</dt>
              <dd className="mt-1 font-semibold text-slate-950">
                <time dateTime={job.createdAt.toISOString()}>
                  {dateFormatter.format(job.createdAt)}
                </time>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  );
}
