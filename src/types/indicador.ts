import { z } from 'zod';

export const tipoMetaOptions = [
  "Até um determinado valor",
  "Acima de determinado valor",
  "Entre dois valores"
] as const;

export const formatoMetaOptions = [
  "Porcentagem",
  "Numérico"
] as const;

export const indicadorSchema = z.object({
  id: z.string().optional(),
  numero: z.string().min(1, "Número é obrigatório"),
  nome: z.string().min(1, "Nome é obrigatório"),
  grupo: z.string().min(1, "Grupo é obrigatório"),
  planoTrabalho: z.string().min(1, "Plano de Trabalho é obrigatório"),
  tipoMeta: z.enum(tipoMetaOptions),
  metaMin: z.coerce.number().optional(),
  metaMax: z.coerce.number().optional(),
  formato: z.enum(formatoMetaOptions),
  pontuacaoMaxima: z.coerce.number().int().min(0, "Deve ser positivo"),
  consolidacao: z.string().min(1, "Forma de Consolidação é obrigatória"),
}).refine((data) => {
  if (data.tipoMeta === "Acima de determinado valor" || data.tipoMeta === "Entre dois valores") {
    return data.metaMin !== undefined && data.metaMin !== null;
  }
  return true;
}, {
  message: "Meta Mínima é obrigatória para este tipo de meta",
  path: ["metaMin"],
}).refine((data) => {
  if (data.tipoMeta === "Até um determinado valor" || data.tipoMeta === "Entre dois valores") {
    return data.metaMax !== undefined && data.metaMax !== null;
  }
  return true;
}, {
  message: "Meta Máxima é obrigatória para este tipo de meta",
  path: ["metaMax"],
});

export type IndicadorFormData = z.infer<typeof indicadorSchema>;

export interface Indicador extends IndicadorFormData {
  id: string;
}
