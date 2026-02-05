import { BarChart3 } from 'lucide-react';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { GlobalFilters } from '@/components/GlobalFilters';
import { cn } from '@/lib/utils';

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

        {/* Filtros Globais - Faixa Horizontal */}
        <GlobalFilters />

        {/* Indicadores Financeiros */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold" style={{ color: 'hsl(205 90% 20%)' }}>
            Indicadores Financeiros
          </h2>
          <div className={cn(
            'rounded-lg border border-border/50 bg-card p-8 shadow-sm',
            'flex items-center justify-center min-h-[200px]'
          )}>
            <p className="text-center text-muted-foreground">
              Espaço destinado ao desenvolvimento dos indicadores financeiros.
            </p>
          </div>
        </section>

        {/* Indicadores Qualitativos */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold" style={{ color: 'hsl(205 90% 20%)' }}>
            Indicadores Qualitativos
          </h2>

          {/* Linha 1: Filtros Locais */}
          <div className={cn(
            'rounded-lg border border-border/50 bg-card p-4 shadow-sm',
            'flex items-center justify-center min-h-[60px]'
          )}>
            <p className="text-sm text-muted-foreground">
              Filtros específicos deste bloco
            </p>
          </div>

          {/* Linha 2: Scorecards Grid (4 colunas) */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border/50 bg-card p-4 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground mb-2">Pontuação Obtida</p>
              <p className="text-2xl font-bold text-foreground">—</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-card p-4 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground mb-2">Pontuação Máxima</p>
              <p className="text-2xl font-bold text-foreground">—</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-card p-4 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground mb-2">Progresso (%)</p>
              <p className="text-2xl font-bold text-foreground">—</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-card p-4 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground mb-2">Dias Restantes</p>
              <p className="text-2xl font-bold text-foreground">—</p>
            </div>
          </div>

          {/* Linha 3: Matriz Detalhada */}
          <div className={cn(
            'rounded-lg border border-border/50 bg-card p-8 shadow-sm',
            'flex items-center justify-center min-h-[250px]'
          )}>
            <p className="text-center text-muted-foreground">
              Espaço destinado à Matriz Detalhada das Metas Qualitativas.
            </p>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  );
}
