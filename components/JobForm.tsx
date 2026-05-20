"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  closeJob,
  createJob,
  type JobActionResult,
  updateJob,
} from "@/app/dashboard/empresa/vagas/actions";
import {
  employmentTypeOptions,
  jobSchema,
  jobStatusLabels,
  type JobFormValues,
  workModeOptions,
} from "@/lib/job-schema";

const inputClassName =
  "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const labelClassName = "text-sm font-semibold text-slate-800";
const errorClassName = "mt-2 text-sm text-red-600";

const emptyValues: JobFormValues = {
  title: "",
  description: "",
  requirements: "",
  location: "",
  workMode: "REMOTE",
  employmentType: "FULL_TIME",
  salary: "",
};

type JobFormProps = {
  mode?: "create" | "edit";
  jobId?: string;
  defaultValues?: JobFormValues;
  status?: keyof typeof jobStatusLabels;
};

export function JobForm({
  mode = "create",
  jobId,
  defaultValues = emptyValues,
  status = "OPEN",
}: JobFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isClosingPending, startClosingTransition] = useTransition();
  const [result, setResult] = useState<JobActionResult | null>(null);
  const [currentStatus, setCurrentStatus] =
    useState<keyof typeof jobStatusLabels>(status);

  const isEditMode = mode === "edit";
  const isBusy = isPending || isClosingPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<JobFormValues> = (values) => {
    setResult(null);

    startTransition(async () => {
      const response =
        isEditMode && jobId
          ? await updateJob(jobId, values)
          : await createJob(values);

      setResult(response);

      if (response.success) {
        reset(isEditMode ? values : emptyValues);
        router.refresh();
      }
    });
  };

  function handleCloseJob() {
    if (!jobId || currentStatus === "CLOSED") {
      return;
    }

    setResult(null);

    startClosingTransition(async () => {
      const response = await closeJob(jobId);
      setResult(response);

      if (response.success) {
        setCurrentStatus("CLOSED");
        router.refresh();
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            {isEditMode ? "Editar vaga" : "Dados da vaga"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {isEditMode
              ? "Atualize as informacoes principais da vaga ou encerre a publicacao quando o processo nao estiver mais aberto."
              : "A vaga sera publicada com status aberta e ficara vinculada ao perfil da empresa logada."}
          </p>
        </div>
        <span className="w-fit rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
          {jobStatusLabels[currentStatus]}
        </span>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="title" className={labelClassName}>
            Titulo
          </label>
          <input
            id="title"
            type="text"
            placeholder="Ex: Desenvolvedor Front-end Junior"
            className={inputClassName}
            {...register("title")}
          />
          {errors.title ? (
            <p className={errorClassName}>{errors.title.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="description" className={labelClassName}>
            Descricao
          </label>
          <textarea
            id="description"
            rows={6}
            placeholder="Descreva responsabilidades, contexto do time e principais desafios da vaga."
            className={inputClassName}
            {...register("description")}
          />
          {errors.description ? (
            <p className={errorClassName}>{errors.description.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="requirements" className={labelClassName}>
            Requisitos
          </label>
          <textarea
            id="requirements"
            rows={4}
            placeholder={
              "Ex:\nReact e TypeScript\nNocoes de APIs REST\nBoa comunicacao"
            }
            className={inputClassName}
            {...register("requirements")}
          />
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Separe os requisitos por linha ou ponto e virgula.
          </p>
          {errors.requirements ? (
            <p className={errorClassName}>{errors.requirements.message}</p>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="location" className={labelClassName}>
              Localizacao
            </label>
            <input
              id="location"
              type="text"
              placeholder="Ex: Sao Paulo, SP"
              className={inputClassName}
              {...register("location")}
            />
            {errors.location ? (
              <p className={errorClassName}>{errors.location.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="salary" className={labelClassName}>
              Salario ou faixa salarial
            </label>
            <input
              id="salary"
              type="text"
              placeholder="Opcional"
              className={inputClassName}
              {...register("salary")}
            />
            {errors.salary ? (
              <p className={errorClassName}>{errors.salary.message}</p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="workMode" className={labelClassName}>
              Modelo de trabalho
            </label>
            <select
              id="workMode"
              className={inputClassName}
              {...register("workMode")}
            >
              {workModeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.workMode ? (
              <p className={errorClassName}>{errors.workMode.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="employmentType" className={labelClassName}>
              Tipo de contratacao
            </label>
            <select
              id="employmentType"
              className={inputClassName}
              {...register("employmentType")}
            >
              {employmentTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.employmentType ? (
              <p className={errorClassName}>
                {errors.employmentType.message}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {result ? (
        <div
          className={`mt-6 rounded-md border px-4 py-3 text-sm ${
            result.success
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          <p>{result.message}</p>
          {result.success ? (
            <Link
              href="/dashboard/empresa/vagas"
              className="mt-2 inline-flex font-semibold underline underline-offset-4"
            >
              Ver vagas da empresa
            </Link>
          ) : null}
        </div>
      ) : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        {isEditMode ? (
          <button
            type="button"
            disabled={isBusy || currentStatus === "CLOSED"}
            onClick={handleCloseJob}
            className="inline-flex h-11 items-center justify-center rounded-md border border-red-200 bg-white px-5 text-sm font-semibold text-red-700 transition-colors hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
          >
            {currentStatus === "CLOSED"
              ? "Vaga fechada"
              : isClosingPending
                ? "Fechando..."
                : "Fechar vaga"}
          </button>
        ) : null}

        <Link
          href="/dashboard/empresa/vagas"
          className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={isBusy}
          className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isPending
            ? isEditMode
              ? "Salvando..."
              : "Criando..."
            : isEditMode
              ? "Salvar alteracoes"
              : "Criar vaga"}
        </button>
      </div>
    </form>
  );
}
