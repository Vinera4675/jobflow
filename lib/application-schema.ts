import { z } from "zod";

export const applicationStatusLabels = {
  SENT: "Enviada",
  REVIEWING: "Em analise",
  APPROVED: "Aprovada",
  REJECTED: "Rejeitada",
} as const;

export const applicationMessageMaxLength = 800;

export const applicationSchema = z.object({
  jobId: z.string().min(1, "Vaga invalida."),
  message: z
    .string()
    .trim()
    .max(
      applicationMessageMaxLength,
      `A mensagem deve ter no maximo ${applicationMessageMaxLength} caracteres.`,
    )
    .optional()
    .default(""),
});

export type ApplicationFormValues = z.input<typeof applicationSchema>;

export function emptyStringToNull(value: string | undefined) {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}
