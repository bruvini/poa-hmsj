import { ReactNode } from 'react';
import { SidebarProvider, useSidebarContext } from '@/contexts/SidebarContext';
import { Header } from './Header';
import { AppSidebar } from './AppSidebar';
import { cn } from '@/lib/utils';

function LayoutContent({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebarContext();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AppSidebar />
      <main
        className={cn(
          'min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out p-4 md:p-6',
          isOpen ? 'ml-64' : 'ml-16'
        )}
      >
        {children}
      </main>
    </div>
  );
}

export function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
