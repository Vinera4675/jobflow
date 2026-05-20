"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  updateApplicationStatus,
  type UpdateApplicationStatusResult,
} from "@/app/dashboard/empresa/vagas/[id]/candidatos/actions";
import {
  applicationStatusLabels,
  applicationStatusOptions,
  type ApplicationStatusValue,
} from "@/lib/application-schema";

type ApplicationStatusFormProps = {
  applicationId: string;
  jobId: string;
  initialStatus: ApplicationStatusValue;
};

export function ApplicationStatusForm({
  applicationId,
  jobId,
  initialStatus,
}: ApplicationStatusFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<ApplicationStatusValue>(initialStatus);
  const [savedStatus, setSavedStatus] =
    useState<ApplicationStatusValue>(initialStatus);
  const [result, setResult] = useState<UpdateApplicationStatusResult | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  const hasChanges = status !== savedStatus;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    startTransition(async () => {
      const response = await updateApplicationStatus({
        applicationId,
        jobId,
        status,
      });

      setResult(response);

      if (response.success && response.status) {
        setSavedStatus(response.status);
        setStatus(response.status);
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="border-b border-slate-200 pb-5">
      <label
        htmlFor={`application-status-${applicationId}`}
        className="text-sm font-semibold text-slate-800"
      >
        Status da candidatura
      </label>
      <select
        id={`application-status-${applicationId}`}
        value={status}
        onChange={(event) =>
          setStatus(event.target.value as ApplicationStatusValue)
        }
        disabled={isPending}
        className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100"
      >
        {applicationStatusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {result ? (
        <p
          className={`mt-3 rounded-md border px-3 py-2 text-sm ${
            result.success
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {result.message}
        </p>
      ) : (
        <p className="mt-3 text-xs leading-5 text-slate-500">
          Status atual: {applicationStatusLabels[savedStatus]}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending || !hasChanges}
        className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isPending ? "Salvando..." : "Salvar status"}
      </button>
    </form>
  );
}
