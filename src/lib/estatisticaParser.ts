import { parse, isValid, format } from 'date-fns';
import { setores } from './constants';
import { EstatisticaRecord } from '@/types';

interface ParseResult {
  success: boolean;
  data: EstatisticaRecord[];
  errors: string[];
}

export function parseEstatisticaInput(input: string): ParseResult {
  const lines = input.split(/\r?\n/).filter(line => line.trim() !== '');
  const data: EstatisticaRecord[] = [];
  const errors: string[] = [];

  lines.forEach((line, index) => {
    // Split by tab or multiple spaces
    // Spreadsheets usually use tabs.
    const columns = line.split('\t');

    // If split by tab results in 1 item, try splitting by multiple spaces
    // but be careful not to split sector names like "CC - PRE OPERATORIO"
    // So \t is safer. The user prompt says "dividir por tabulação (\t) ou espaços múltiplos".
    // I will try tab first. If len < 16, try multiple spaces (2 or more).
    let cols = columns;
    if (cols.length < 16) {
       cols = line.split(/\s{2,}/);
    }

    // Clean up columns (trim whitespace)
    cols = cols.map(c => c.trim());

    if (cols.length < 16) {
      errors.push(`Linha ${index + 1}: Número incorreto de colunas. Esperado 16, encontrado ${cols.length}.`);
      return;
    }

    // Mapping
    // 0: Data
    // 1: Setor
    // 2..15: Numbers

    const rawData = cols[0];
    const rawSetor = cols[1];

    // Parse Date
    let dateStr = '';
    const parsedDate = parse(rawData, 'dd/MM/yyyy', new Date());
    if (!isValid(parsedDate)) {
       errors.push(`Linha ${index + 1}: Data inválida '${rawData}'. Formato esperado: DD/MM/YYYY.`);
       return;
    }
    dateStr = format(parsedDate, 'yyyy-MM-dd'); // ISO format for storage/input type=date

    // Validate Setor
    // Normalize string? The prompt says "exact match".
    // "Garantir que o nome do setor colado corresponda exatamente à lista oficial"
    if (!setores.includes(rawSetor as any)) {
      errors.push(`Linha ${index + 1}: Setor inválido '${rawSetor}'.`);
      return;
    }

    // Parse Numbers
    const parseNum = (val: string, fieldName: string): number => {
      // Remove thousands separators if any (dots) and replace decimal comma with dot
      // Assuming Brazilian format: 1.000,00 -> 1000.00
      // But these are counts, likely integers.
      let cleanVal = val.replace(/\./g, '').replace(',', '.');
      const num = Number(cleanVal);
      if (isNaN(num)) {
         errors.push(`Linha ${index + 1}: Valor inválido para '${fieldName}': '${val}'`);
         return -1;
      }
      if (num < 0) {
        errors.push(`Linha ${index + 1}: Valor negativo para '${fieldName}': '${val}'`);
        return -1;
      }
      return num;
    };

    // We check for errors immediately inside parseNum but we need to stop if error
    const currentErrorsLen = errors.length;

    const pacientes00h = parseNum(cols[2], 'Pacientes 00h');
    const internacoes = parseNum(cols[3], 'Internações');
    const transfDe = parseNum(cols[4], 'Transf. De');
    const altas = parseNum(cols[5], 'Altas');
    const transfPara = parseNum(cols[6], 'Transf. Para');
    const obitos = parseNum(cols[7], 'Óbitos');
    const obitosMais24h = parseNum(cols[8], 'Óbitos > 24h');
    const obitosMenos24h = parseNum(cols[9], 'Óbitos < 24h');
    const pacienteDia = parseNum(cols[10], 'Paciente Dia');
    const leitosAtivos = parseNum(cols[11], 'Leitos Ativos');
    const leitosExtras = parseNum(cols[12], 'Leitos Extras');
    const leitosReforma = parseNum(cols[13], 'Leitos Reforma');
    const leitosInterditados = parseNum(cols[14], 'Leitos Interditados');
    const leitosDia = parseNum(cols[15], 'Leitos Dia');

    if (errors.length > currentErrorsLen) {
      return; // Skip this line if numeric errors found
    }

    const saidas = altas + transfPara + obitos;

    data.push({
      id: crypto.randomUUID(),
      data: dateStr,
      setor: rawSetor,
      pacientes00h,
      internacoes,
      transfDe,
      altas,
      transfPara,
      obitos,
      obitosMais24h,
      obitosMenos24h,
      pacienteDia,
      leitosAtivos,
      leitosExtras,
      leitosReforma,
      leitosInterditados,
      leitosDia,
      saidas
    });
  });

  return {
    success: errors.length === 0,
    data: errors.length === 0 ? data : [],
    errors
  };
}
