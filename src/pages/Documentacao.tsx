import { FileText, BarChart2, ExternalLink } from 'lucide-react';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { DashboardCard } from '@/components/DashboardCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Documentacao() {
  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Documentação Técnica</h2>
          <p className="text-muted-foreground">
            Informações técnicas e guias do Plano Operativo Anual
          </p>
        </div>

        {/* Descrição Técnica */}
        <DashboardCard
          title="Descrição Técnica"
          description="Detalhes técnicos do sistema POA"
          icon={FileText}
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="visao-geral">
              <AccordionTrigger className="text-sm font-medium">
                Visão Geral do Sistema
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                O Plano Operativo Anual (POA) é um instrumento de gestão que detalha 
                as ações, metas e recursos necessários para a execução das atividades 
                do Hospital Municipal São José durante o ano fiscal.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="estrutura">
              <AccordionTrigger className="text-sm font-medium">
                Estrutura do Dashboard
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                O dashboard é organizado em módulos: Indicadores Financeiros 
                (receitas, despesas e balanço), Indicadores Qualitativos 
                (métricas de atendimento) e Acompanhamento de Metas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="atualizacao">
              <AccordionTrigger className="text-sm font-medium">
                Periodicidade de Atualização
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Os dados são atualizados conforme a periodicidade definida para 
                cada indicador, podendo ser diária, semanal, mensal ou trimestral.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DashboardCard>

        {/* Definição das Métricas */}
        <DashboardCard
          title="Definição das Métricas"
          description="Como os indicadores são calculados"
          icon={BarChart2}
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="financeiros">
              <AccordionTrigger className="text-sm font-medium">
                Indicadores Financeiros
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Receitas:</strong> Total de entradas financeiras no período.</li>
                  <li><strong>Despesas:</strong> Total de saídas financeiras no período.</li>
                  <li><strong>Balanço:</strong> Diferença entre receitas e despesas.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="qualitativos">
              <AccordionTrigger className="text-sm font-medium">
                Indicadores Qualitativos
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Taxa de Ocupação:</strong> Percentual de leitos ocupados.</li>
                  <li><strong>Tempo Médio de Permanência:</strong> Dias de internação por paciente.</li>
                  <li><strong>Satisfação do Paciente:</strong> Índice baseado em pesquisas.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="metas">
              <AccordionTrigger className="text-sm font-medium">
                Metas e Objetivos
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                As metas são definidas anualmente com base no planejamento estratégico 
                e são acompanhadas através de indicadores de desempenho específicos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DashboardCard>

        {/* Links Úteis */}
        <DashboardCard
          title="Links Úteis"
          description="Recursos externos e referências"
          icon={ExternalLink}
        >
          <div className="space-y-3">
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Manual de Indicadores Hospitalares
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Legislação Aplicável
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Portal de Transparência
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Contato do Suporte Técnico
            </a>
          </div>
        </DashboardCard>
      </div>
    </LayoutWrapper>
  );
}
