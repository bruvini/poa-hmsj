

# POA - HMSJ | Plano Operativo Anual
## MVP do Dashboard Hospitalar

### Visão Geral
Construção de um dashboard institucional elegante e profissional para o Hospital Municipal São José, focado na visualização do Plano Operativo Anual.

---

### 🎨 Design System

**Identidade Visual**
- Fundo off-white com paleta de azuis institucionais
- Tipografia: Inter (similar ao Myriad Pro)
- Cores primárias: Azul escuro (#06365E, #0F2854)
- Cores de acento: Azul médio (#1C4D8D, #4988C4)
- Background claro: #BDE8F5

**Princípios**
- Interface minimalista e profissional
- 100% em português brasileiro
- Apenas tema claro
- Responsivo para desktop, tablet e mobile

---

### 📐 Estrutura da Aplicação

**Layout Principal**
1. **Header Fixo**
   - Botão hamburger para controle da sidebar
   - Logo institucional (imagem externa)
   - Título em duas linhas: "Plano Operativo Anual (POA)" + "Hospital Municipal São José"

2. **Sidebar Navegação**
   - Recolhida por padrão (apenas ícones)
   - Expandida mostra ícone + texto
   - Destaque visual na rota ativa
   - 3 itens: Dashboard, Documentação Técnica, Configurações

3. **Área de Conteúdo**
   - Layout fluido que se adapta ao estado da sidebar

---

### 📄 Páginas

**1. Dashboard (Home)**
- Layout em grid responsivo
- Seção de Filtros Globais (topo)
- Cards de Indicadores Financeiros (esquerda/meio)
- Cards de Indicadores Qualitativos (direita/baixo)
- Todos com empty states elegantes ("Sem dados disponíveis")

**2. Documentação Técnica**
- Três seções organizadas em cards/accordions:
  - Descrição Técnica
  - Definição das Métricas
  - Links Úteis

**3. Configurações**
- Layout limpo preparado para futuras definições
- Placeholder para parâmetros do sistema

---

### 🔧 Arquitetura Técnica

**Componentização**
- `LayoutWrapper` - Estrutura principal
- `Header` - Cabeçalho institucional
- `Sidebar` - Navegação lateral
- `DashboardCard` - Cards reutilizáveis
- `EmptyState` - Placeholder elegante

**Gerenciamento de Estado**
- Context API para controle da sidebar (aberta/fechada)
- Preparação para dados via JSON (estados iniciais vazios)

**Rotas**
- `/` → Dashboard
- `/documentacao` → Documentação Técnica
- `/configuracoes` → Configurações

---

### ✅ Entregáveis do MVP

- Interface completa e navegável
- Design system institucional aplicado
- Sidebar funcional (recolher/expandir)
- 3 páginas com empty states elegantes
- Totalmente responsivo (desktop, tablet, mobile)
- Código limpo e modular, pronto para integração futura

