import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebarContext } from '@/contexts/SidebarContext';

const LOGO_URL = 'https://media.licdn.com/dms/image/v2/C4D22AQHJwufLRwLmuA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1646686043965?e=2147483647&v=beta&t=gpXNQ2vHLfXkuz1hAo8B_lazEuwHHkeTCQXBg7IhrnY';

export function Header() {
  const { toggle } = useSidebarContext();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-card px-4 shadow-sm md:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        className="shrink-0 text-foreground hover:bg-accent"
        aria-label="Alternar menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex items-center gap-3">
        <img
          src={LOGO_URL}
          alt="Logo Hospital Municipal São José"
          className="h-10 rounded-md object-contain"
          style={{ aspectRatio: '632/172' }}
        />
        
        <div className="flex flex-col">
          <h1 className="text-sm font-bold leading-tight text-primary md:text-base">
            Plano Operativo Anual (POA)
          </h1>
          <span className="text-xs text-muted-foreground md:text-sm">
            Hospital Municipal São José
          </span>
        </div>
      </div>
    </header>
  );
}
