import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { BatchImportDialog } from "@/components/settings/BatchImportDialog";
import { IndicadorFormDialog } from "@/components/settings/IndicadorFormDialog";
import { IndicadorManagerDialog } from "@/components/settings/IndicadorManagerDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Configuracoes() {
  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Configurações</h2>
          <p className="text-muted-foreground">
            Gerenciamento do sistema e indicadores
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesse as principais funcionalidades de configuração e cadastro.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. Importar Dados em Lote */}
              <BatchImportDialog />

              {/* 2. Gerenciar Indicadores */}
              <IndicadorManagerDialog />

              {/* 3. Novo Indicador */}
              <IndicadorFormDialog />
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  );
}
