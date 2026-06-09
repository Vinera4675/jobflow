"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  applyToJob,
  type ApplicationActionResult,
} from "@/app/vagas/[id]/actions";
import { applicationMessageMaxLength } from "@/lib/application-schema";

type ApplicationFormProps = {
  jobId: string;
};

export function ApplicationForm({ jobId }: ApplicationFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ApplicationActionResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const wasSent = result?.success === true;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    startTransition(async () => {
      const response = await applyToJob({
        jobId,
        message,
      });

      setResult(response);

      if (response.success) {
        setMessage("");
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="application-message"
          className="text-sm font-semibold text-slate-800"
        >
          Mensagem para a empresa
        </label>
        <textarea
          id="application-message"
          rows={5}
          maxLength={applicationMessageMaxLength}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Opcional: conte brevemente por que você tem interesse nesta vaga."
          className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
        <p className="mt-2 text-xs text-slate-500">
          {message.length}/{applicationMessageMaxLength} caracteres
        </p>
      </div>

      {result ? (
        <div
          className={`mt-5 rounded-md border px-4 py-3 text-sm ${
            result.success
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {result.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending || wasSent}
        className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isPending
          ? "Enviando..."
          : wasSent
            ? "Candidatura enviada"
            : "Enviar candidatura"}
      </button>
    </form>
  );
}
