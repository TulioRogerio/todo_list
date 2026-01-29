# 📁 STRUCTURE - TodoList Zero Point v0.1.0

> **Descrição**: Este arquivo documenta a estrutura completa de arquivos e pastas do projeto TodoList com arquitetura Micro Frontends.

---

## 📑 Índice

1. [Visão Geral](#-visão-geral)
2. [Estrutura do Backend](#-estrutura-do-backend)
3. [Estrutura do Auth App](#-estrutura-do-auth-app)
4. [Estrutura do Tasks App](#-estrutura-do-tasks-app)
5. [Estrutura do Root Config](#-estrutura-do-root-config)

---

## 🔭 Visão Geral

Estrutura raiz do projeto com todos os componentes.

```
TodoList/
├── backend/          # API NestJS com Prisma
├── auth-app/         # Micro frontend de autenticação (React + Vite)
├── tasks-app/        # Micro frontend de tarefas (React + Vite)
└── root-config/      # Orquestrador Single SPA
```

---

## 🔧 Estrutura do Backend

Servidor NestJS com autenticação JWT, Prisma ORM e PostgreSQL.

```
backend/
├── .env                          # Variáveis de ambiente (DATABASE_URL, JWT_SECRET)
├── package.json                  # Dependências e scripts npm
├── tsconfig.json                 # Configuração do TypeScript
├── prisma/
│   └── schema.prisma            # Schema do banco de dados Prisma
└── src/
    ├── main.ts                  # Ponto de entrada da aplicação
    ├── app.module.ts            # Módulo raiz que importa todos os módulos
    ├── prisma/
    │   ├── prisma.module.ts     # Módulo do Prisma (global)
    │   └── prisma.service.ts    # Serviço de conexão com o banco
    ├── auth/
    │   ├── auth.module.ts       # Módulo de autenticação
    │   ├── auth.controller.ts   # Endpoints de login e registro
    │   ├── auth.service.ts      # Lógica de autenticação
    │   ├── jwt.strategy.ts      # Estratégia JWT para Passport
    │   ├── decorators/
    │   │   └── roles.decorator.ts  # Decorator @Roles para controle de acesso
    │   ├── guards/
    │   │   └── roles.guard.ts   # Guard de verificação de roles
    │   └── dto/
    │       ├── login.dto.ts     # DTO de validação do login
    │       └── register.dto.ts  # DTO de validação do registro
    └── tasks/
        ├── tasks.module.ts      # Módulo de tarefas
        ├── tasks.controller.ts  # Endpoints CRUD de tarefas
        ├── tasks.service.ts     # Lógica de negócio de tarefas
        └── dto/
            ├── create-task.dto.ts  # DTO de criação de tarefa
            └── update-task.dto.ts  # DTO de atualização de tarefa
    └── users/
        ├── users.module.ts      # Módulo de usuários
        └── users.service.ts     # Serviço de usuários
    └── reports/
        ├── reports.module.ts    # Módulo de relatórios
        └── reports.service.ts   # Serviço de relatórios
```

---

## 🔐 Estrutura do Auth App

Micro frontend React responsável pela autenticação de usuários.

```
auth-app/
├── package.json                # Dependências e scripts npm
├── vite.config.ts             # Configuração do Vite (porta 3001)
├── tsconfig.json              # Configuração do TypeScript
└── src/
    ├── main.tsx               # Ponto de entrada da aplicação
    ├── App.tsx                # Componente principal
    ├── root.component.tsx     # Componente raiz para Single SPA
    ├── styles/
    │   └── theme.ts           # Design system (cores, tamanhos, gradientes)
    ├── layouts/
    │   └── AuthLayout.tsx     # Layout de duas colunas para autenticação
    ├── components/
    │   ├── LoginForm.tsx      # Formulário de login
    │   └── ui/
    │       ├── InputField.tsx      # Campo de input reutilizável
    │       ├── PasswordField.tsx   # Campo de senha com toggle
    │       └── TestCredentials.tsx # Badge de credenciais de teste
    └── services/
        └── authService.ts     # Serviço de autenticação (login, logout, token)
```

---

## 📋 Estrutura do Tasks App

Micro frontend React responsável pelo gerenciamento de tarefas.

```
tasks-app/
├── package.json                # Dependências e scripts npm
├── vite.config.ts             # Configuração do Vite (porta 3002)
├── tsconfig.json              # Configuração do TypeScript
└── src/
    ├── main.tsx               # Ponto de entrada da aplicação
    ├── App.tsx                # Componente principal com CRUD de tarefas
    ├── root.component.tsx     # Componente raiz para Single SPA
    ├── styles/
    │   └── theme.ts           # Design system (cores, tamanhos)
    ├── layouts/
    │   └── DashboardLayout.tsx # Layout do dashboard com header
    ├── components/
    │   ├── TaskHeader.tsx     # Header com busca e botão nova tarefa
    │   ├── TaskTable.tsx      # Tabela de listagem de tarefas
    │   ├── TaskDialog.tsx     # Modal de criação/edição de tarefa
    │   └── ui/
    │       ├── SearchField.tsx     # Campo de busca
    │       └── TaskStatusTag.tsx   # Tag de status (Pendente/Concluída)
    └── services/
        ├── api.ts             # Configuração do axios
        ├── authService.ts     # Serviço de autenticação
        └── taskService.ts     # Serviço CRUD de tarefas
```

---

## 🎛️ Estrutura do Root Config

Orquestrador Single SPA que coordena os micro frontends.

```
root-config/
├── index.html        # Página principal com lógica de roteamento
├── package.json      # Dependência do servidor serve
└── .gitignore        # Ignora node_modules
```

---

## 📊 Diagrama de Comunicação

```
                    ┌─────────────────┐
                    │   Root Config   │
                    │   (porta 9000)  │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            ▼                ▼                ▼
   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
   │  Auth App   │   │ Tasks App   │   │   Backend   │
   │ (porta 3001)│   │(porta 3002) │   │ (porta 3000)│
   └─────────────┘   └─────────────┘   └──────┬──────┘
                                              │
                                       ┌──────▼──────┐
                                       │  PostgreSQL │
                                       └─────────────┘
```
