import { Filter, DollarSign, TrendingUp, Activity, BarChart3 } from 'lucide-react';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { DashboardCard } from '@/components/DashboardCard';
import { EmptyState } from '@/components/EmptyState';

export default function Dashboard() {
  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">
            Visão geral do Plano Operativo Anual
          </p>
        </div>

        {/* Filtros Globais */}
        <DashboardCard
          title="Filtros Globais"
          description="Selecione os parâmetros para filtrar os dados"
          icon={Filter}
        >
          <EmptyState
            icon={Filter}
            title="Filtros não configurados"
            description="Os filtros globais estarão disponíveis após a configuração inicial."
          />
        </DashboardCard>

        {/* Grid de Indicadores */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Indicadores Financeiros */}
          <DashboardCard
            title="Receitas"
            description="Acompanhamento de receitas"
            icon={DollarSign}
            className="md:col-span-1"
          >
            <EmptyState
              icon={DollarSign}
              title="Dados de receitas"
              description="Informações financeiras serão exibidas aqui."
            />
          </DashboardCard>

          <DashboardCard
            title="Despesas"
            description="Controle de despesas"
            icon={TrendingUp}
            className="md:col-span-1"
          >
            <EmptyState
              icon={TrendingUp}
              title="Dados de despesas"
              description="Informações de gastos serão exibidas aqui."
            />
          </DashboardCard>

          <DashboardCard
            title="Balanço Financeiro"
            description="Resultado consolidado"
            icon={BarChart3}
            className="md:col-span-1"
          >
            <EmptyState
              icon={BarChart3}
              title="Balanço geral"
              description="O balanço financeiro será exibido aqui."
            />
          </DashboardCard>
        </div>

        {/* Indicadores Qualitativos */}
        <div className="grid gap-6 md:grid-cols-2">
          <DashboardCard
            title="Indicadores de Qualidade"
            description="Métricas de atendimento"
            icon={Activity}
          >
            <EmptyState
              icon={Activity}
              title="Indicadores qualitativos"
              description="Métricas de qualidade serão exibidas aqui."
            />
          </DashboardCard>

          <DashboardCard
            title="Metas do POA"
            description="Acompanhamento de metas"
            icon={BarChart3}
          >
            <EmptyState
              icon={BarChart3}
              title="Progresso das metas"
              description="O progresso das metas será exibido aqui."
            />
          </DashboardCard>
        </div>
      </div>
    </LayoutWrapper>
  );
}
