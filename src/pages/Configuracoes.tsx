import { Settings as SettingsIcon, Sliders, Bell, Users } from 'lucide-react';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { DashboardCard } from '@/components/DashboardCard';
import { EmptyState } from '@/components/EmptyState';

export default function Configuracoes() {
  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Configurações</h2>
          <p className="text-muted-foreground">
            Parâmetros e preferências do sistema
          </p>
        </div>

        {/* Grid de Configurações */}
        <div className="grid gap-6 md:grid-cols-2">
          <DashboardCard
            title="Parâmetros Gerais"
            description="Configurações básicas do sistema"
            icon={Sliders}
          >
            <EmptyState
              icon={Sliders}
              title="Parâmetros do sistema"
              description="As configurações gerais estarão disponíveis em breve."
            />
          </DashboardCard>

          <DashboardCard
            title="Notificações"
            description="Preferências de alertas"
            icon={Bell}
          >
            <EmptyState
              icon={Bell}
              title="Configuração de alertas"
              description="Gerencie suas preferências de notificação aqui."
            />
          </DashboardCard>

          <DashboardCard
            title="Usuários e Permissões"
            description="Gerenciamento de acessos"
            icon={Users}
          >
            <EmptyState
              icon={Users}
              title="Gestão de usuários"
              description="Controle de acessos será implementado em breve."
            />
          </DashboardCard>

          <DashboardCard
            title="Preferências do POA"
            description="Configurações específicas do plano"
            icon={SettingsIcon}
          >
            <EmptyState
              icon={SettingsIcon}
              title="Preferências do POA"
              description="Personalize as configurações do plano operativo."
            />
          </DashboardCard>
        </div>
      </div>
    </LayoutWrapper>
  );
}
