import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Trash2, Upload } from "lucide-react";
import { useEstatisticaStore } from "@/hooks/useEstatisticaStore";
import { parseEstatisticaInput } from "@/lib/estatisticaParser";

export function BatchImportDialog() {
  const { addBatchRecords, records, removeRecord } = useEstatisticaStore();
  const [batchInput, setBatchInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleBatchImport = () => {
    if (!batchInput.trim()) {
      toast.error("Cole os dados da planilha antes de processar.");
      return;
    }

    const result = parseEstatisticaInput(batchInput);

    if (result.success) {
      addBatchRecords(result.data);
      toast.success(`${result.data.length} linhas importadas com sucesso!`);
      setBatchInput("");
    } else {
      toast.error(`Erro na importação: ${result.errors.length} erros encontrados.`);
      result.errors.slice(0, 3).forEach(err => toast.error(err));
      if (result.errors.length > 3) {
         toast.error(`E mais ${result.errors.length - 3} erros...`);
      }
    }
  };

  const handleDelete = (id: string) => {
    removeRecord(id);
    toast.success("Registro removido.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full h-20 text-lg gap-2" style={{ backgroundColor: '#06365E' }}>
          <Upload className="h-6 w-6" />
          Importar Dados em Lote
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Importação de Dados em Lote</DialogTitle>
          <DialogDescription>
            Cole os dados da planilha para importação em massa e confira os resultados.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          <div className="space-y-2">
             <Label>Colar dados da Planilha</Label>
             <Textarea
               placeholder="Data	Setor	00:00	Intern.	Transf DE	Altas	Transf PARA	Obitos	Óbitos +24Hs	Obitos -24Hs	Paciente/Dia	Leitos Ativos	Leitos Extras	Leitos Reforma	Leitos Interd.	Leitos-dia"
               className="min-h-[150px] font-mono text-sm"
               value={batchInput}
               onChange={(e) => setBatchInput(e.target.value)}
             />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleBatchImport} style={{ backgroundColor: '#06365E' }}>
              Processar e Salvar
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Controle de Dados Locais</Label>
            <div className="rounded-md border">
              <ScrollArea className="w-full whitespace-nowrap rounded-md border h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Setor</TableHead>
                      <TableHead>00:00</TableHead>
                      <TableHead>Intern.</TableHead>
                      <TableHead>Transf DE</TableHead>
                      <TableHead>Altas</TableHead>
                      <TableHead>Transf PARA</TableHead>
                      <TableHead>Obitos</TableHead>
                      <TableHead>Óbitos +24h</TableHead>
                      <TableHead>Óbitos -24h</TableHead>
                      <TableHead>Pac./Dia</TableHead>
                      <TableHead>Leitos Ativ.</TableHead>
                      <TableHead>L. Extras</TableHead>
                      <TableHead>L. Reforma</TableHead>
                      <TableHead>L. Interd.</TableHead>
                      <TableHead>Leitos-dia</TableHead>
                      <TableHead className="font-bold">Total Saídas</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={18} className="text-center h-24">
                          Nenhum registro encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      records.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{new Date(record.data + 'T00:00:00').toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell>{record.setor}</TableCell>
                          <TableCell>{record.pacientes00h}</TableCell>
                          <TableCell>{record.internacoes}</TableCell>
                          <TableCell>{record.transfDe}</TableCell>
                          <TableCell>{record.altas}</TableCell>
                          <TableCell>{record.transfPara}</TableCell>
                          <TableCell>{record.obitos}</TableCell>
                          <TableCell>{record.obitosMais24h}</TableCell>
                          <TableCell>{record.obitosMenos24h}</TableCell>
                          <TableCell>{record.pacienteDia}</TableCell>
                          <TableCell>{record.leitosAtivos}</TableCell>
                          <TableCell>{record.leitosExtras}</TableCell>
                          <TableCell>{record.leitosReforma}</TableCell>
                          <TableCell>{record.leitosInterditados}</TableCell>
                          <TableCell>{record.leitosDia}</TableCell>
                          <TableCell className="font-bold text-blue-600">{record.saidas}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(record.id)}
                              className="text-destructive hover:text-destructive/90"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
