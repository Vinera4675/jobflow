import { z } from "zod";

export const workModeOptions = [
  { value: "REMOTE", label: "Remoto" },
  { value: "HYBRID", label: "Hibrido" },
  { value: "ONSITE", label: "Presencial" },
] as const;

export const employmentTypeOptions = [
  { value: "INTERNSHIP", label: "Estagio" },
  { value: "JUNIOR", label: "Junior" },
  { value: "FULL_TIME", label: "Periodo integral" },
  { value: "PART_TIME", label: "Meio periodo" },
] as const;

export const jobStatusLabels = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
} as const;

export const workModeLabels = Object.fromEntries(
  workModeOptions.map((option) => [option.value, option.label]),
) as Record<(typeof workModeOptions)[number]["value"], string>;

export const employmentTypeLabels = Object.fromEntries(
  employmentTypeOptions.map((option) => [option.value, option.label]),
) as Record<(typeof employmentTypeOptions)[number]["value"], string>;

export const jobSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Informe o titulo da vaga.")
      .max(120, "O titulo deve ter no maximo 120 caracteres."),
    description: z
      .string()
      .trim()
      .min(30, "Escreva uma descricao com pelo menos 30 caracteres.")
      .max(3000, "A descricao deve ter no maximo 3000 caracteres."),
    requirements: z
      .string()
      .trim()
      .min(3, "Informe pelo menos um requisito.")
      .max(1200, "Os requisitos devem ter no maximo 1200 caracteres."),
    location: z
      .string()
      .trim()
      .min(2, "Informe a localizacao da vaga.")
      .max(120, "A localizacao deve ter no maximo 120 caracteres."),
    workMode: z.enum(["REMOTE", "HYBRID", "ONSITE"]),
    employmentType: z.enum([
      "INTERNSHIP",
      "JUNIOR",
      "FULL_TIME",
      "PART_TIME",
    ]),
    salary: z
      .string()
      .trim()
      .max(80, "A faixa salarial deve ter no maximo 80 caracteres."),
  })
  .superRefine((values, context) => {
    if (parseRequirements(values.requirements).length === 0) {
      context.addIssue({
        code: "custom",
        message: "Informe pelo menos um requisito valido.",
        path: ["requirements"],
      });
    }
  });

export type JobFormValues = z.infer<typeof jobSchema>;

export function parseRequirements(requirements: string) {
  return Array.from(
    new Set(
      requirements
        .split(/[\n;]/)
        .map((requirement) => requirement.trim())
        .filter(Boolean),
    ),
  );
}

export function emptyStringToNull(value: string | undefined) {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}
