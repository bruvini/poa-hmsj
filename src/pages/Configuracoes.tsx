import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useEstatisticaStore,
  estatisticaSchema,
  type EstatisticaFormData,
  setores,
} from "@/hooks/useEstatisticaStore";

const numericFields = [
  { name: "pacientes00h", label: "Pacientes 00h" },
  { name: "internacoes", label: "Internações" },
  { name: "transfDe", label: "Transf. De" },
  { name: "altas", label: "Altas" },
  { name: "transfPara", label: "Transf. Para" },
  { name: "obitos", label: "Óbitos" },
  { name: "obitosMais24h", label: "Óbitos > 24h" },
  { name: "obitosMenos24h", label: "Óbitos < 24h" },
  { name: "pacienteDia", label: "Paciente Dia" },
  { name: "leitosAtivos", label: "Leitos Ativos" },
  { name: "leitosExtras", label: "Leitos Extras" },
  { name: "leitosReforma", label: "Leitos Reforma" },
  { name: "leitosInterditados", label: "Leitos Interditados" },
  { name: "leitosDia", label: "Leitos Dia" },
] as const;

export default function Configuracoes() {
  const { addRecord, records, removeRecord } = useEstatisticaStore();

  const form = useForm<EstatisticaFormData>({
    resolver: zodResolver(estatisticaSchema),
    defaultValues: {
      data: new Date().toISOString().split("T")[0],
      pacientes00h: 0,
      internacoes: 0,
      transfDe: 0,
      altas: 0,
      transfPara: 0,
      obitos: 0,
      obitosMais24h: 0,
      obitosMenos24h: 0,
      pacienteDia: 0,
      leitosAtivos: 0,
      leitosExtras: 0,
      leitosReforma: 0,
      leitosInterditados: 0,
      leitosDia: 0,
    },
  });

  const onSubmit = (data: EstatisticaFormData) => {
    addRecord(data);
    toast.success("Dados salvos com sucesso!");
    form.reset({
      ...data, // Keep date and maybe sector? No, clear mostly.
      setor: undefined,
      pacientes00h: 0,
      internacoes: 0,
      transfDe: 0,
      altas: 0,
      transfPara: 0,
      obitos: 0,
      obitosMais24h: 0,
      obitosMenos24h: 0,
      pacienteDia: 0,
      leitosAtivos: 0,
      leitosExtras: 0,
      leitosReforma: 0,
      leitosInterditados: 0,
      leitosDia: 0,
    });
  };

  const handleDelete = (id: string) => {
    removeRecord(id);
    toast.success("Registro removido.");
  };

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Configurações</h2>
          <p className="text-muted-foreground">
            Gerenciamento de dados estatísticos
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Entrada de Dados - Estatística</CardTitle>
            <CardDescription>
              Preencha os dados estatísticos diários por setor.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="data"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="setor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Setor</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um setor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {setores.map((setor) => (
                              <SelectItem key={setor} value={setor}>
                                {setor}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {numericFields.map((fieldItem) => (
                    <FormField
                      key={fieldItem.name}
                      control={form.control}
                      name={fieldItem.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">
                            {fieldItem.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              {...field}
                              onChange={(e) => field.onChange(e)} // Let zod coerce handle it or number input
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" size="lg">
                    Salvar Dados
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Controle de Dados Locais</CardTitle>
            <CardDescription>
              Visualize e gerencie os registros salvos localmente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Saídas (Calc)</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center h-24">
                        Nenhum registro encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{new Date(record.data + 'T00:00:00').toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{record.setor}</TableCell>
                        <TableCell>{record.saidas}</TableCell>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  );
}
