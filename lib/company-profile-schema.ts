import { z } from "zod";

const optionalUrl = z.union([
  z.literal(""),
  z
    .string()
    .trim()
    .url("Informe uma URL valida.")
    .max(255, "A URL deve ter no maximo 255 caracteres."),
]);

export const companyProfileSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Informe o nome da empresa.")
    .max(100, "O nome deve ter no maximo 100 caracteres."),
  description: z
    .string()
    .trim()
    .min(20, "Escreva uma descricao com pelo menos 20 caracteres.")
    .max(1200, "A descricao deve ter no maximo 1200 caracteres."),
  website: optionalUrl,
  location: z
    .string()
    .trim()
    .min(2, "Informe a localizacao da empresa.")
    .max(120, "A localizacao deve ter no maximo 120 caracteres."),
});

export type CompanyProfileFormInput = z.infer<typeof companyProfileSchema>;

export type CompanyProfileFormValues = {
  companyName: string;
  description: string;
  website: string;
  location: string;
};

export function emptyStringToNull(value: string | undefined) {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}
