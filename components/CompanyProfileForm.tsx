"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  saveCompanyProfile,
  type CompanyProfileActionResult,
} from "@/app/dashboard/empresa/perfil/actions";
import {
  companyProfileSchema,
  type CompanyProfileFormValues,
} from "@/lib/company-profile-schema";

type CompanyProfileFormProps = {
  defaultValues: CompanyProfileFormValues;
  hasProfile: boolean;
};

const inputClassName =
  "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const labelClassName = "text-sm font-semibold text-slate-800";
const errorClassName = "mt-2 text-sm text-red-600";

export function CompanyProfileForm({
  defaultValues,
  hasProfile,
}: CompanyProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<CompanyProfileActionResult | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyProfileFormValues>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<CompanyProfileFormValues> = (values) => {
    setResult(null);

    startTransition(async () => {
      const response = await saveCompanyProfile(values);
      setResult(response);

      if (response.success) {
        reset(values);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            {hasProfile ? "Editar perfil" : "Criar perfil"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Essas informacoes serao usadas futuramente para publicar vagas e
            apresentar a empresa para candidatos.
          </p>
        </div>
        <span className="w-fit rounded-md bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
          Empresa
        </span>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="companyName" className={labelClassName}>
            Nome da empresa
          </label>
          <input
            id="companyName"
            type="text"
            placeholder="Ex: JobFlow Labs"
            className={inputClassName}
            {...register("companyName")}
          />
          {errors.companyName ? (
            <p className={errorClassName}>{errors.companyName.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="description" className={labelClassName}>
            Descricao
          </label>
          <textarea
            id="description"
            rows={5}
            placeholder="Conte sobre a empresa, cultura, produto e tipo de profissionais que busca."
            className={inputClassName}
            {...register("description")}
          />
          {errors.description ? (
            <p className={errorClassName}>{errors.description.message}</p>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="website" className={labelClassName}>
              Website
            </label>
            <input
              id="website"
              type="url"
              placeholder="https://empresa.com"
              className={inputClassName}
              {...register("website")}
            />
            {errors.website ? (
              <p className={errorClassName}>{errors.website.message}</p>
            ) : null}
          </div>

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
          {result.message}
        </div>
      ) : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isPending ? "Salvando..." : "Salvar perfil"}
        </button>
      </div>
    </form>
  );
}
