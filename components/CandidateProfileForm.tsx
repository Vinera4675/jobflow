"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  saveCandidateProfile,
  type CandidateProfileActionResult,
} from "@/app/dashboard/candidato/perfil/actions";
import {
  candidateProfileSchema,
  type CandidateProfileFormValues,
} from "@/lib/candidate-profile-schema";

type CandidateProfileFormProps = {
  defaultValues: CandidateProfileFormValues;
  hasProfile: boolean;
};

const inputClassName =
  "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const labelClassName = "text-sm font-semibold text-slate-800";
const errorClassName = "mt-2 text-sm text-red-600";

export function CandidateProfileForm({
  defaultValues,
  hasProfile,
}: CandidateProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<CandidateProfileActionResult | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CandidateProfileFormValues>({
    resolver: zodResolver(candidateProfileSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<CandidateProfileFormValues> = (values) => {
    setResult(null);

    startTransition(async () => {
      const response = await saveCandidateProfile(values);
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
            Essas informacoes serao usadas futuramente para candidaturas e para
            destacar suas habilidades para empresas.
          </p>
        </div>
        <span className="w-fit rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
          Candidato
        </span>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="title" className={labelClassName}>
            Titulo profissional
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
          <label htmlFor="bio" className={labelClassName}>
            Bio
          </label>
          <textarea
            id="bio"
            rows={5}
            placeholder="Conte um pouco sobre sua experiencia, interesses e objetivos profissionais."
            className={inputClassName}
            {...register("bio")}
          />
          {errors.bio ? (
            <p className={errorClassName}>{errors.bio.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="skills" className={labelClassName}>
            Habilidades
          </label>
          <textarea
            id="skills"
            rows={3}
            placeholder="Ex: React, Next.js, TypeScript, Tailwind CSS"
            className={inputClassName}
            {...register("skills")}
          />
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Separe as habilidades por virgula, ponto e virgula ou linha.
          </p>
          {errors.skills ? (
            <p className={errorClassName}>{errors.skills.message}</p>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label htmlFor="githubUrl" className={labelClassName}>
              GitHub
            </label>
            <input
              id="githubUrl"
              type="url"
              placeholder="https://github.com/seu-usuario"
              className={inputClassName}
              {...register("githubUrl")}
            />
            {errors.githubUrl ? (
              <p className={errorClassName}>{errors.githubUrl.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="linkedinUrl" className={labelClassName}>
              LinkedIn
            </label>
            <input
              id="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/seu-perfil"
              className={inputClassName}
              {...register("linkedinUrl")}
            />
            {errors.linkedinUrl ? (
              <p className={errorClassName}>{errors.linkedinUrl.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="resumeUrl" className={labelClassName}>
              Curriculo
            </label>
            <input
              id="resumeUrl"
              type="url"
              placeholder="https://..."
              className={inputClassName}
              {...register("resumeUrl")}
            />
            {errors.resumeUrl ? (
              <p className={errorClassName}>{errors.resumeUrl.message}</p>
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
