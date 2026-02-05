export interface EstatisticaRecord {
  id: string;
  data: string; // ISO Date
  setor: string;
  pacientes00h: number;
  internacoes: number;
  transfDe: number;
  altas: number;
  transfPara: number;
  obitos: number;
  obitosMais24h: number;
  obitosMenos24h: number;
  pacienteDia: number;
  leitosAtivos: number;
  leitosExtras: number;
  leitosReforma: number;
  leitosInterditados: number;
  leitosDia: number;
  saidas: number; // Calculated: altas + transfPara + obitos
}
