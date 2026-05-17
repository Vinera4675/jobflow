import { z } from "zod";

const optionalUrl = z
  .union([
    z.literal(""),
    z
      .string()
      .trim()
      .url("Informe uma URL valida.")
      .max(255, "A URL deve ter no maximo 255 caracteres."),
  ]);

export const candidateProfileSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(2, "Informe um titulo profissional.")
      .max(80, "O titulo deve ter no maximo 80 caracteres."),
    bio: z
      .string()
      .trim()
      .min(20, "Escreva uma bio com pelo menos 20 caracteres.")
      .max(1000, "A bio deve ter no maximo 1000 caracteres."),
    skills: z
      .string()
      .trim()
      .min(2, "Informe pelo menos uma habilidade.")
      .max(500, "A lista de habilidades deve ter no maximo 500 caracteres."),
    githubUrl: optionalUrl,
    linkedinUrl: optionalUrl,
    resumeUrl: optionalUrl,
  })
  .superRefine((values, context) => {
    if (parseSkills(values.skills).length === 0) {
      context.addIssue({
        code: "custom",
        message: "Informe pelo menos uma habilidade valida.",
        path: ["skills"],
      });
    }
  });

export type CandidateProfileFormInput = z.infer<
  typeof candidateProfileSchema
>;

export type CandidateProfileFormValues = {
  title: string;
  bio: string;
  skills: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
};

export function parseSkills(skills: string) {
  return Array.from(
    new Set(
      skills
        .split(/[\n,;]/)
        .map((skill) => skill.trim())
        .filter(Boolean),
    ),
  );
}

export function emptyStringToNull(value: string | undefined) {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}
