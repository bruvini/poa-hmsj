import { useState, useEffect } from 'react';
import { z } from 'zod';
import { setores } from '@/lib/constants';
import { EstatisticaRecord } from '@/types';

// Re-export specific types/constants if needed by consumers, or they can import directly.
// The UI uses 'setores' and 'estatisticaSchema' and 'EstatisticaFormData'.
export { setores };

export const estatisticaSchema = z.object({
  data: z.string().min(1, "Data é obrigatória"),
  setor: z.enum(setores, {
    errorMap: () => ({ message: "Selecione um setor válido" }),
  }),
  pacientes00h: z.coerce.number().min(0, "Deve ser positivo"),
  internacoes: z.coerce.number().min(0, "Deve ser positivo"),
  transfDe: z.coerce.number().min(0, "Deve ser positivo"),
  altas: z.coerce.number().min(0, "Deve ser positivo"),
  transfPara: z.coerce.number().min(0, "Deve ser positivo"),
  obitos: z.coerce.number().min(0, "Deve ser positivo"),
  obitosMais24h: z.coerce.number().min(0, "Deve ser positivo"),
  obitosMenos24h: z.coerce.number().min(0, "Deve ser positivo"),
  pacienteDia: z.coerce.number().min(0, "Deve ser positivo"),
  leitosAtivos: z.coerce.number().min(0, "Deve ser positivo"),
  leitosExtras: z.coerce.number().min(0, "Deve ser positivo"),
  leitosReforma: z.coerce.number().min(0, "Deve ser positivo"),
  leitosInterditados: z.coerce.number().min(0, "Deve ser positivo"),
  leitosDia: z.coerce.number().min(0, "Deve ser positivo"),
});

export type EstatisticaFormData = z.infer<typeof estatisticaSchema>;

const STORAGE_KEY = 'estatistica-local-storage';

export function useEstatisticaStore() {
  const [records, setRecords] = useState<EstatisticaRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecords(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored records", e);
      }
    }
  }, []);

  const saveToStorage = (newRecords: EstatisticaRecord[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords));
    setRecords(newRecords);
  };

  const addRecord = (data: EstatisticaFormData) => {
    const saidas = data.altas + data.transfPara + data.obitos;
    const newRecord: EstatisticaRecord = {
      ...data,
      id: crypto.randomUUID(),
      saidas,
    };
    const updatedRecords = [...records, newRecord];
    saveToStorage(updatedRecords);
    return newRecord;
  };

  const addBatchRecords = (newRecords: EstatisticaRecord[]) => {
    const updatedRecords = [...records, ...newRecords];
    saveToStorage(updatedRecords);
  };

  const removeRecord = (id: string) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    saveToStorage(updatedRecords);
  };

  return {
    records,
    addRecord,
    addBatchRecords,
    removeRecord,
  };
}
