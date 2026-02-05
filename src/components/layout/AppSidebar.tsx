import { LayoutDashboard, FileText, Settings } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useSidebarContext } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/documentacao', icon: FileText, label: 'Documentação Técnica' },
  { to: '/configuracoes', icon: Settings, label: 'Configurações' },
];

export function AppSidebar() {
  const { isOpen } = useSidebarContext();

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-sidebar transition-all duration-300 ease-in-out sidebar-scrollbar overflow-y-auto',
        isOpen ? 'w-64' : 'w-16'
      )}
    >
      <nav className="flex flex-col gap-1 p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2.5 text-sidebar-foreground transition-colors hover:bg-sidebar-accent',
              !isOpen && 'justify-center px-2'
            )}
            activeClassName="bg-sidebar-accent border-l-4 border-sidebar-primary text-sidebar-primary font-medium"
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {isOpen && (
              <span className="truncate text-sm">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
