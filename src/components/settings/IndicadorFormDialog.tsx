import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useIndicadorStore,
} from "@/hooks/useIndicadorStore";
import {
  indicadorSchema,
  type IndicadorFormData,
  tipoMetaOptions,
  formatoMetaOptions,
  Indicador
} from "@/types/indicador";
import { useEffect, useState } from "react";

interface IndicadorFormDialogProps {
  indicadorToEdit?: Indicador | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function IndicadorFormDialog({ indicadorToEdit, open: controlledOpen, onOpenChange: controlledOnOpenChange, trigger }: IndicadorFormDialogProps) {
  const { addIndicador, updateIndicador } = useIndicadorStore();
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = controlledOnOpenChange || setInternalOpen;

  const form = useForm<IndicadorFormData>({
    resolver: zodResolver(indicadorSchema),
    defaultValues: {
      numero: "",
      nome: "",
      grupo: "",
      planoTrabalho: "",
      tipoMeta: "Até um determinado valor",
      formato: "Porcentagem",
      pontuacaoMaxima: 0,
      consolidacao: "",
      metaMin: 0, // default to avoid uncontrolled input issues
      metaMax: 0,
    },
  });

  // Reset form when opening or changing edit mode
  useEffect(() => {
    if (isOpen) {
      if (indicadorToEdit) {
        form.reset({
          numero: indicadorToEdit.numero,
          nome: indicadorToEdit.nome,
          grupo: indicadorToEdit.grupo,
          planoTrabalho: indicadorToEdit.planoTrabalho,
          tipoMeta: indicadorToEdit.tipoMeta,
          metaMin: indicadorToEdit.metaMin,
          metaMax: indicadorToEdit.metaMax,
          formato: indicadorToEdit.formato,
          pontuacaoMaxima: indicadorToEdit.pontuacaoMaxima,
          consolidacao: indicadorToEdit.consolidacao,
        });
      } else {
        form.reset({
          numero: "",
          nome: "",
          grupo: "",
          planoTrabalho: "",
          tipoMeta: "Até um determinado valor",
          formato: "Porcentagem",
          pontuacaoMaxima: 0,
          consolidacao: "",
          metaMin: undefined,
          metaMax: undefined,
        });
      }
    }
  }, [isOpen, indicadorToEdit, form]);

  const onSubmit = (data: IndicadorFormData) => {
    try {
      if (indicadorToEdit) {
        updateIndicador(indicadorToEdit.id, data);
        toast.success("Indicador atualizado com sucesso!");
      } else {
        addIndicador(data);
        toast.success("Indicador cadastrado com sucesso!");
      }
      setIsOpen(false);
    } catch (e) {
      console.error(e);
      toast.error("Erro ao salvar indicador");
    }
  };

  const tipoMeta = form.watch("tipoMeta");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger ? (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="default" className="w-full h-20 text-lg gap-2" style={{ backgroundColor: '#06365E' }}>
            <Plus className="h-6 w-6" />
            Novo Indicador
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{indicadorToEdit ? "Editar Indicador" : "Novo Indicador"}</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do indicador técnico.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: 1.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pontuacaoMaxima"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pontuação Máxima</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Indicador</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="grupo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grupo</FormLabel>
                    <FormControl>
                      <Input placeholder="Grupo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="planoTrabalho"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plano de Trabalho</FormLabel>
                    <FormControl>
                      <Input placeholder="Plano" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="tipoMeta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Meta</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tipoMetaOptions.map(opt => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="formato"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formato</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o formato" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {formatoMetaOptions.map(opt => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(tipoMeta === "Acima de determinado valor" || tipoMeta === "Entre dois valores") && (
                <FormField
                  control={form.control}
                  name="metaMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Mínima</FormLabel>
                      <FormControl>
                        <Input type="number" step="any" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {(tipoMeta === "Até um determinado valor" || tipoMeta === "Entre dois valores") && (
                 <FormField
                  control={form.control}
                  name="metaMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Máxima</FormLabel>
                      <FormControl>
                        <Input type="number" step="any" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="consolidacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de Consolidação</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descreva como o indicador é consolidado..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg" style={{ backgroundColor: '#06365E' }}>
                {indicadorToEdit ? "Atualizar Indicador" : "Cadastrar Indicador"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
