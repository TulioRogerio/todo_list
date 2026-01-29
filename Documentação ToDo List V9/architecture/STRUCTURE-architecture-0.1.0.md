# 🏗️ Guia de Estrutura e Padronização - TodoList V9

> **Objetivo**: Definir as regras de diretórios e nomenclatura para a criação de novos arquivos e funcionalidades. Use este guia para saber **onde** criar seus arquivos e **como** nomeá-los.

---

## 🖥️ Frontend (Micro Frontends)
Aplicável para: `auth-app` e `tasks-app`.

### 1. Criar Nova Página / Tela
As páginas representam visões completas acessíveis por rota.
*   **Onde**: `src/layouts/` (Se for uma estrutura de página) ou `src/pages/` (se criada futuramente). Atualmente, o padrão utiliza **Layouts** para compor as telas principais.
*   **Nomenclatura**: `PascalCase` + Suffix `Layout` (ou `Page`).
*   **Exemplo**:
    *   Quer criar uma página de Configurações?
    *   📂 Criar: `src/layouts/SettingsLayout.tsx`

### 2. Criar Novo Componente Visual
Componentes reutilizáveis (botões, cards, tabelas).
*   **Onde**:
    *   **Componentes de Negócio** (Específicos do domínio): `src/components/`
    *   **Componentes de UI** (Genéricos/Design System): `src/components/ui/`
*   **Nomenclatura**: `PascalCase`.
*   **Exemplos**:
    *   Card de Tarefa: `src/components/TaskCard.tsx`
    *   Botão Personalizado: `src/components/ui/PrimaryButton.tsx`

### 3. Criar Novo Serviço (Integração API)
Funções para chamar o backend ou lógica complexa.
*   **Onde**: `src/services/`
*   **Nomenclatura**: `camelCase` + Suffix `Service` ou agrupamento lógico.
*   **Exemplos**:
    *   Lógica de Pagamento: `src/services/paymentService.ts`
    *   Formatadores: `src/services/formatters.ts`

### 4. Estilização
*   **Onde**: `src/styles/` para temas globais.
*   **Padrão**: Utilizar classes utilitárias (PrimeFlex) diretamente no JSX ou objetos de estilo no `theme.ts` se necessário. Evitar criar arquivos `.css` isolados a menos que estritamente necessário.

---

## ⚙️ Backend (NestJS)
Aplicável para: `backend`.

### 1. Criar Novo Módulo (Feature)
Ao adicionar um novo domínio (ex: Pagamentos, Notificações).
*   **Onde**: `src/<nome-do-modulo>/`
*   **Comando**: `nest g module <nome-do-modulo>`
*   **Estrutura Obrigatória**:
    *   `src/payments/payments.module.ts` (Definição)
    *   `src/payments/payments.controller.ts` (Rotas/Endpoints)
    *   `src/payments/payments.service.ts` (Regra de Negócio)

### 2. Criar DTO (Data Transfer Object)
Para validar dados de entrada em endpoints.
*   **Onde**: `src/<nome-do-modulo>/dto/`
*   **Nomenclatura**: `kebab-case` + `.dto.ts`.
*   **Exemplos**:
    *   Criar Pagamento: `src/payments/dto/create-payment.dto.ts`
    *   Atualizar Status: `src/payments/dto/update-status.dto.ts`

### 3. Criar Entidade de Banco de Dados
*   **Onde**: `prisma/schema.prisma`
*   **Padrão**: `PascalCase` para o Model.
*   **Processo**:
    1.  Adicionar model no `schema.prisma`.
    2.  Rodar `npx prisma migrate dev` para gerar a migration.

---

## 📂 Resumo de Decisão

| O que você quer criar? | Onde colocar? | Padrão de Nome |
| :--- | :--- | :--- |
| **Página/Rota** | `src/layouts/` | `NomeDaPaginaLayout.tsx` |
| **Componente (Relógio, Tabela)** | `src/components/` | `NomeDoComponente.tsx` |
| **Componente UI (Input, Badge)** | `src/components/ui/` | `NomeDoComponente.tsx` |
| **Lógica/API Frontend** | `src/services/` | `nomeDoServico.ts` |
| **Módulo Backend** | `src/nome-modulo/` | `nome-modulo.module.ts` |
| **Endpoint/Rota Backend** | `src/nome-modulo/` | `nome-modulo.controller.ts` |
| **Validação Backend** | `src/nome-modulo/dto/` | `acao-objeto.dto.ts` |

---

## ⚠️ Regras de Ouro

1.  **Não modifique o `root-config`** para lógica de negócio. Ele serve apenas para roteamento e orquestração.
2.  **Mantenha Hooks separados**: Se um componente frontend tem muita lógica (`useEffect`, `useState`), extraia para um hook personalizado em `src/hooks/useNomeDaLogica.ts`.
3.  **Backend First**: Ao criar uma nova feature completa, comece pelo **Schema (Prisma)**, depois **Backend (Service/Controller)** e por último **Frontend**.
