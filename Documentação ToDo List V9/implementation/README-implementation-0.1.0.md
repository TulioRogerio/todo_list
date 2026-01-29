# 🧩 Implementação - Regras e Padrões (TodoList V9)

> **Versão das Regras**: 0.1.0
> **Status**: Ativo e Obrigatório
> **Referência**: Baseado no [Ponto Zero](../zero-point/README-zero-point-0.1.0.md) e na [Arquitetura](../architecture/README-architecture-0.1.0.md).

Este documento define as **regras estritas** para implementar novas funcionalidades no sistema. SEGUIR ESTE GUIA É OBRIGATÓRIO para manter a integridade da arquitetura Micro Frontends + Backend Modular.

---

## 🚫 Princípios Fundamentais (Não quebre!)

1.  **Backend First**: NUNCA comece criando telas. Primeiro defina os dados (Prisma), depois a API (NestJS), e só então a Interface (React).
2.  **DTOs são Obrigatórios**: Nenhum endpoint deve receber `any` ou objetos sem validação. Use `class-validator` para tudo.
3.  **Frontend sem Lógica de Negócio**: O Frontend serve para **exibir dados** e **capturar input**. Regras complexas (ex: cálculo de multa, validação de regras de negócio) ficam no Backend.
4.  **Autenticação via Token**: Todo request protegido DEVE enviar o header `Authorization: Bearer <token>`. O Frontend nunca gera tokens, apenas armazena.

---

## 🛠️ Fluxo de Implementação de Nova Feature

Para criar uma nova funcionalidade (ex: "Sistema de Categorias"), siga rigorosamente esta ordem:

### 1️⃣ Camada de Dados (Prisma)
Se a feature precisa salvar dados, comece aqui.

1.  Edite `backend/prisma/schema.prisma`.
2.  Crie o novo Model. Use `PascalCase`.
3.  Execute a migração:
    ```bash
    npx prisma migrate dev --name create_feature_name
    ```
4.  Gere o client atualizado (automático no comando acima, mas se precisar: `npx prisma generate`).

### 2️⃣ Camada de Backend (NestJS)

1.  **Crie o Módulo**:
    ```bash
    nest g module features/categorias
    ```
2.  **Crie o Controller e Service**:
    ```bash
    nest g controller features/categorias --no-spec
    nest g service features/categorias --no-spec
    ```
3.  **Defina os DTOs** (`src/features/categorias/dto/`):
    *   `create-categoria.dto.ts` (Validar entrada POST)
    *   `update-categoria.dto.ts` (Validar entrada PATCH)
4.  **Implemente o Service**: Use o `PrismaService` para acessar o banco.
5.  **Implemente o Controller**: Use `@UseGuards(AuthGuard('jwt'))` se for protegido.

### 3️⃣ Camada de Integração (Frontend Services)

Escolha o Micro Frontend correto (`auth-app` ou `tasks-app`).

1.  Vá em `src/services/`.
2.  Crie ou atualize o serviço correspondente. Ex: `categoryService.ts`.
3.  O serviço deve retornar a tipagem correta (interface TypeScript pareada com o DTO do backend).

### 4️⃣ Camada de Interface (Frontend Components/Pages)

1.  **Crie os Componentes de UI** (`src/components/ui/`):
    *   Input específico, Badge, Card visual.
2.  **Crie os Componentes Funcionais** (`src/components/`):
    *   Tabelas, Formulários, Dialogs.
3.  **Integre na Tela**:
    *   Use o `Layout` padrão (`DashboardLayout` ou `AuthLayout`).
    *   Gerencie o estado (loading, data, error) no componente pai ou em um Custom Hook.

---

## 📏 Regras de Código e Estilo

### Backend (NestJS)

*   **Injeção de Dependência**: Sempre injete serviços via construtor `private readonly`.
*   **Tratamento de Erro**: O Service deve lançar exceções HTTP (`NotFoundException`, `BadRequestException`), não retornar `null` ou `false` silenciosamente.
*   **Retorno**: Retorne objetos limpos. Evite retornar a senha do usuário ou dados sensíveis.

### Frontend (React + Vite)

*   **Estilização**:
    *   **Proibido**: Classes CSS globais (exceto reset).
    *   **Obrigatório**: Use **PrimeFlex** (`flex`, `p-4`, `shadow-2`) ou estilos inline via `style={{ color: theme.colors.primary }}` usando o arquivo `theme.ts` centralizado.
*   **Componentes**:
    *   Use **PrimeReact** para componentes complexos (DataTable, Dialog, Toast). Não reinvente a roda.
*   **Estado**:
    *   Prefira `useState` local para formulários simples.
    *   Evite bibliotecas de estado global (Redux/Zustand) a menos que o dado precise ser compartilhado entre muitas rotas.

---

## 🧪 Validação da Implementação

Antes de dar a tarefa como "Pronta":

1.  **Backend compila?** (`npm run build` no backend)
2.  **Frontend compila?** (`npm run build` no app)
3.  **O fluxo funciona do zero?** (Login -> Acessa Tela -> Executa Ação -> Vê Resultado)
4.  **Banco de dados está consistente?** (Verifique no `npx prisma studio`)

---

## ⚠️ Checklist de Segurança

*   [ ] O endpoint valida todos os campos do DTO?
*   [ ] O endpoint verifica se o usuário tem permissão para alterar aquele dado? (Ex: Usuário A não pode deixar Task do Usuário B).
*   [ ] O frontend trata erros de API (401, 403, 500) amigavelmente?

---

> **Dúvida?** Consulte a pasta `/zero-point` para ver como o código base foi feito. Mantenha a consistência com o que já existe.
