import { useState } from "react";
import { toast } from "sonner";
import { Settings2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIndicadorStore } from "@/hooks/useIndicadorStore";
import { IndicadorFormDialog } from "./IndicadorFormDialog";
import { Indicador } from "@/types/indicador";

export function IndicadorManagerDialog() {
  const { indicadores, removeIndicador } = useIndicadorStore();
  const [editingIndicador, setEditingIndicador] = useState<Indicador | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = (id: string) => {
    removeIndicador(id);
    toast.success("Indicador removido.");
  };

  const handleEdit = (indicador: Indicador) => {
    setEditingIndicador(indicador);
    setIsEditOpen(true);
  };

  const handleEditOpenChange = (open: boolean) => {
    setIsEditOpen(open);
    if (!open) setEditingIndicador(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full h-20 text-lg gap-2" style={{ backgroundColor: '#06365E' }}>
          <Settings2 className="h-6 w-6" />
          Gerenciar Indicadores
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Gerenciar Indicadores</DialogTitle>
          <DialogDescription>
            Lista de indicadores cadastrados no sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="rounded-md border">
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Grupo</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Meta</TableHead>
                    <TableHead className="text-right">Pontuação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indicadores.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center h-24">
                        Nenhum indicador cadastrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    indicadores.map((ind) => (
                      <TableRow key={ind.id}>
                        <TableCell className="font-medium">{ind.numero}</TableCell>
                        <TableCell>{ind.nome}</TableCell>
                        <TableCell>{ind.grupo}</TableCell>
                        <TableCell>{ind.planoTrabalho}</TableCell>
                        <TableCell className="text-xs">
                          {ind.tipoMeta}<br/>
                          <span className="text-muted-foreground">
                            {ind.formato}
                            {ind.metaMin !== undefined ? ` [Min: ${ind.metaMin}]` : ''}
                            {ind.metaMax !== undefined ? ` [Max: ${ind.metaMax}]` : ''}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{ind.pontuacaoMaxima}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                             <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(ind)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(ind.id)}
                              className="text-destructive hover:text-destructive/90"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>

        {/* Nested Dialog for Editing */}
        {/* We render it conditionally to ensure fresh state */}
        {isEditOpen && (
          <IndicadorFormDialog
             open={isEditOpen}
             onOpenChange={handleEditOpenChange}
             indicadorToEdit={editingIndicador}
             trigger={<span className="hidden"></span>} // Hidden trigger since we control open state
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
