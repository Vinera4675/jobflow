import Link from "next/link";
import { ClerkAuthButton } from "@/components/ClerkAuthButton";

type JobDetailsAuthGateProps = {
  job: {
    id: string;
    title: string;
    company: {
      companyName: string;
    };
  };
};

export function JobDetailsAuthGate({ job }: JobDetailsAuthGateProps) {
  const redirectUrl = `/vagas/${job.id}`;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
      <p className="mx-auto w-fit rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100">
        Detalhes da vaga
      </p>
      <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Entre para ver os detalhes de {job.title}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
        Esta oportunidade foi publicada por {job.company.companyName}. Acesse
        sua conta para consultar a descricao completa, requisitos e enviar sua
        candidatura quando seu perfil permitir.
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ClerkAuthButton
          action="signIn"
          forceRedirectUrl={redirectUrl}
          className="inline-flex h-11 w-full items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 sm:w-auto"
        >
          Entrar para ver detalhes
        </ClerkAuthButton>
        <ClerkAuthButton
          action="signUp"
          forceRedirectUrl={redirectUrl}
          className="inline-flex h-11 w-full items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
        >
          Criar conta
        </ClerkAuthButton>
      </div>

      <Link
        href="/vagas"
        className="mt-6 inline-flex text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
      >
        Voltar para vagas disponiveis
      </Link>
    </section>
  );
}
