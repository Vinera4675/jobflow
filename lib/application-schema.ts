import { z } from "zod";

export const applicationStatusLabels = {
  SENT: "Enviada",
  REVIEWING: "Em análise",
  APPROVED: "Aprovada",
  REJECTED: "Rejeitada",
} as const;

export const applicationStatusOptions = [
  { value: "SENT", label: applicationStatusLabels.SENT },
  { value: "REVIEWING", label: applicationStatusLabels.REVIEWING },
  { value: "APPROVED", label: applicationStatusLabels.APPROVED },
  { value: "REJECTED", label: applicationStatusLabels.REJECTED },
] as const;

export const applicationStatusSchema = z.enum([
  "SENT",
  "REVIEWING",
  "APPROVED",
  "REJECTED",
]);

export const applicationMessageMaxLength = 800;

export const applicationSchema = z.object({
  jobId: z.string().min(1, "Vaga inválida."),
  message: z
    .string()
    .trim()
    .max(
      applicationMessageMaxLength,
      `A mensagem deve ter no máximo ${applicationMessageMaxLength} caracteres.`,
    )
    .optional()
    .default(""),
});

export type ApplicationFormValues = z.input<typeof applicationSchema>;

export type ApplicationStatusValue = z.infer<typeof applicationStatusSchema>;

export function emptyStringToNull(value: string | undefined) {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}
