# 📖 README - TodoList Zero Point v0.1.0

> **Descrição**: Este é o guia principal para configuração e execução do projeto TodoList com arquitetura Micro Frontends (Single SPA). Contém os passos completos para inicializar o backend NestJS e os micro frontends React.

---

## 📑 Índice

1. [Backend NestJS - Configuração Inicial](#-backend-nestjs---configuração-inicial)
2. [Micro Frontends - Auth App e Tasks App](#-micro-frontends---auth-app-e-tasks-app)
3. [Root Config - Orquestrador Single SPA](#-root-config---orquestrador-single-spa)
4. [Mapa de Portas](#-mapa-de-portas)

---

# 🔧 Backend NestJS - Configuração Inicial

> **Descrição**: Passo a passo para criar, configurar e executar o servidor backend com NestJS, Prisma ORM e autenticação JWT.

## 📁 Criar Estrutura do Projeto

Cria a pasta do projeto e inicializa o npm.

```bash
mkdir backend
cd backend
npm init -y
```

## 📦 package.json Base

Arquivo de configuração com todas as dependências necessárias para o backend.

```json
{
  "name": "backend",
  "version": "0.1.0",
  "description": "Backend TodoList Single SPA",
  "main": "dist/main.js",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "start": "node dist/main",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "format": "prettier --write \"src/**/*.ts\"",
    "lint": "eslint \"src/**/*.ts\" --fix",
    "test": "jest"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.15",
    "@nestjs/core": "^10.4.15",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/mapped-types": "^2.0.6",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/platform-express": "^10.4.15",
    "@prisma/client": "^5.22.0",
    "bcryptjs": "^2.4.3",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "prisma": "^5.22.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.9",
    "@nestjs/schematics": "^10.2.3",
    "@nestjs/testing": "^10.4.15",
    "@types/bcryptjs": "^2.4.6",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.14",
    "@types/node": "^20.17.10",
    "@types/passport-jwt": "^4.0.1",
    "eslint": "^8.57.1",
    "jest": "^29.7.0",
    "prettier": "^3.4.2",
    "rimraf": "^5.0.10",
    "ts-jest": "^29.2.5",
    "typescript": "^5.7.2"
  },
  "overrides": {
    "multer": "1.4.5-lts.1",
    "body-parser": "^1.20.3",
    "express": "^4.21.2",
    "path-to-regexp": "^0.1.12",
    "glob": "^10.5.0",
    "external-editor": "^3.1.0",
    "tmp": "^0.2.5"
  }
}

```

---

## 📥 Instalação das Dependências

Instala todos os pacotes definidos no package.json.

```powershell
npm install
```

---

## 📂 Estrutura de Arquivos do Backend

> **Descrição**: Scripts PowerShell para criar automaticamente a estrutura de pastas e arquivos do backend.

### Script de Criação de Pastas e Arquivos

Cria toda a estrutura de diretórios e arquivos em lote (executar dentro da pasta backend).

```powershell
# Criar estrutura de pastas e arquivos em lote (executar dentro da pasta backend)
New-Item -Path "prisma" -ItemType Directory -Force
New-Item -Path "src\prisma" -ItemType Directory -Force
New-Item -Path "src\auth\dto" -ItemType Directory -Force
New-Item -Path "src\auth\decorators" -ItemType Directory -Force
New-Item -Path "src\auth\guards" -ItemType Directory -Force
New-Item -Path "src\tasks\dto" -ItemType Directory -Force
New-Item -Path "src\users\" -ItemType Directory -Force
New-Item -Path "src\reports\" -ItemType Directory -Force

# Arquivos raiz
New-Item .env -ItemType File -Force
New-Item tsconfig.json -ItemType File -Force

# Prisma
New-Item prisma\schema.prisma -ItemType File -Force

# src raiz
New-Item src\main.ts -ItemType File -Force
New-Item src\app.module.ts -ItemType File -Force

# Prisma module
New-Item src\prisma\prisma.module.ts -ItemType File -Force
New-Item src\prisma\prisma.service.ts -ItemType File -Force

# Auth module
New-Item src\auth\auth.module.ts -ItemType File -Force
New-Item src\auth\auth.controller.ts -ItemType File -Force
New-Item src\auth\auth.service.ts -ItemType File -Force
New-Item src\auth\jwt.strategy.ts -ItemType File -Force
New-Item src\auth\decorators\roles.decorator.ts -ItemType File -Force
New-Item src\auth\guards\roles.guard.ts -ItemType File -Force
New-Item src\auth\dto\login.dto.ts -ItemType File -Force
New-Item src\auth\dto\register.dto.ts -ItemType File -Force

# Tasks module
New-Item src\tasks\tasks.module.ts -ItemType File -Force
New-Item src\tasks\tasks.controller.ts -ItemType File -Force
New-Item src\tasks\tasks.service.ts -ItemType File -Force
New-Item src\tasks\dto\create-task.dto.ts -ItemType File -Force
New-Item src\tasks\dto\update-task.dto.ts -ItemType File -Force

# Users
New-Item src\users\users.service.ts -ItemType File -Force
New-Item src\users\users.module.ts -ItemType File -Force

# Reports
New-Item src\reports\reports.service.ts -ItemType File -Force
New-Item src\reports\reports.module.ts -ItemType File -Force

```

### 🌳 Árvore de Arquivos

Visualização da estrutura completa de pastas e arquivos do backend.

```
backend/
├── .env
├── package.json
├── tsconfig.json
├── prisma/
│   └── schema.prisma
└── src/
    ├── main.ts
    ├── app.module.ts
    ├── prisma/
    │   ├── prisma.module.ts
    │   └── prisma.service.ts
    ├── auth/
    │   ├── auth.module.ts
    │   ├── auth.controller.ts
    │   ├── auth.service.ts
    │   ├── jwt.strategy.ts
    │   ├── decorators/
    │   │   └── roles.decorator.ts
    │   ├── guards/
    │   │   └── roles.guard.ts
    │   └── dto/
    │       ├── login.dto.ts
    │       └── register.dto.ts
    └── tasks/
        ├── tasks.module.ts
        ├── tasks.controller.ts
        ├── tasks.service.ts
        └── dto/
            ├── create-task.dto.ts
            └── update-task.dto.ts
```

---

## ▶️ Executar o Backend

> Crie todos os arquivos do [[Setup - Backend]] conforme as orientações, depois retorne aqui.

Depois de compilar os arquivos, execute o npm run build manualmente. Depois reinicie o servidor backend (npm run start:dev) para garantir que ele carregue os arquivos corretamente.

```bash
# Desenvolvimento (watch mode)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

---

## 👤 (Opcional) Adicionar Usuário de Teste no PgAdmin

Insere um usuário de teste diretamente no banco de dados PostgreSQL.

```sql
-- Inserir usuário de teste (senha: admin123)
INSERT INTO "User" (email, password, name, role)
VALUES (
  'admin@admin.com',
  '$2a$12$ofSEnorkclKxlPaGdvt9DOOsgKp7JkpakHiDaM4oZmcku52n2bad.',
  'Administrador',
  'USER'
);
```

---

# 🎨 Micro Frontends - Auth App e Tasks App

> **Descrição**: Configuração dos micro frontends React com Vite para autenticação (Auth App) e gerenciamento de tarefas (Tasks App).

---

## 🔐 Auth App (Porta 3001)

Micro frontend responsável pela autenticação de usuários (login/registro).

### Criar Projeto

```bash
npm create vite@6.1.0 auth-app -- --template react-ts
cd auth-app
```

### Instalar Dependências

> ⚠️ **IMPORTANTE**: Versões fixas garantem instalação reproduzível. Não usar `^` ou `~`.

```bash
# Primeiro, instalar base
npm install

# HTTP Client
npm install axios@1.7.9

# UI Components
npm install primereact@10.9.5 primeicons@7.0.0 primeflex@3.3.1

# Router
npm install react-router-dom@7.1.1

# Single SPA Adapter
npm install single-spa-react@6.0.2

# Types (dev)
npm install -D @types/node@22.10.5

# Correção dos erros
npm audit fix
```

### Organização das Pastas e Arquivos

Script para criar a estrutura de arquivos do Auth App.

```bash
# Criando pastas (estrutura modular)
New-Item -Path "src\services" -ItemType Directory -Force
New-Item -Path "src\components" -ItemType Directory -Force
New-Item -Path "src\components\ui" -ItemType Directory -Force
New-Item -Path "src\styles" -ItemType Directory -Force
New-Item -Path "src\layouts" -ItemType Directory -Force

# Deletando arquivos desnecessários
del src\App.css             # Ajustar o main.tsx, retirando o CSS dos Imports
del src\index.css
del src\assets\react.svg

# Criando arquivos na pasta 
New-Item src\root.component.tsx -ItemType File -Force
New-Item src\styles\theme.ts -ItemType File -Force
New-Item src\layouts\AuthLayout.tsx -ItemType File -Force
New-Item src\components\LoginForm.tsx -ItemType File -Force
New-Item src\components\ui\InputField.tsx -ItemType File -Force
New-Item src\components\ui\PasswordField.tsx -ItemType File -Force
New-Item src\components\ui\TestCredentials.tsx -ItemType File -Force
New-Item src\services\authService.ts -ItemType File -Force
```

---

## 📋 Tasks App (Porta 3002)

Micro frontend responsável pelo CRUD de tarefas do usuário.

### Criar Projeto

```bash
npm create vite@6.1.0 tasks-app -- --template react-ts
cd tasks-app
```

### Instalar Dependências

```bash
# Primeiro, instalar base
npm install

# HTTP Client
npm install axios@1.7.9

# UI Components
npm install primereact@10.9.5 primeicons@7.0.0 primeflex@3.3.1

# Router
npm install react-router-dom@7.1.1

# Single SPA Adapter
npm install single-spa-react@6.0.2

# Types (dev)
npm install -D @types/node@22.10.5

# Erros
npm audit fix
```

### Organização das Pastas e Arquivos

Script para criar a estrutura de arquivos do Tasks App.

```bash
# Criando pastas (estrutura modular)
New-Item -Path "src\services" -ItemType Directory -Force
New-Item -Path "src\components" -ItemType Directory -Force
New-Item -Path "src\components\ui" -ItemType Directory -Force
New-Item -Path "src\styles" -ItemType Directory -Force
New-Item -Path "src\layouts" -ItemType Directory -Force

# Deletando arquivos desnecessários
del src\App.css             # Ajustar o main.tsx, retirando o CSS dos Imports
del src\index.css
del src\assets\react.svg

# Criando arquivos na pasta 
New-Item src\root.component.tsx -ItemType File -Force
New-Item src\styles\theme.ts -ItemType File -Force
New-Item src\layouts\DashboardLayout.tsx -ItemType File -Force
New-Item src\components\TaskHeader.tsx -ItemType File -Force
New-Item src\components\TaskTable.tsx -ItemType File -Force
New-Item src\components\TaskDialog.tsx -ItemType File -Force
New-Item src\components\ui\SearchField.tsx -ItemType File -Force
New-Item src\components\ui\TaskStatusTag.tsx -ItemType File -Force
New-Item src\services\api.ts -ItemType File -Force
New-Item src\services\authService.ts -ItemType File -Force
New-Item src\services\taskService.ts -ItemType File -Force
```

---

## ▶️ Executar os Micro Frontends

> Crie todos os arquivos do [[Setup - Frontend]] conforme as orientações, depois retorne aqui.

### Iniciar Servidores

```bash
# Terminal 1 - Auth App
cd auth-app
npm run dev

# Terminal 2 - Tasks App
cd tasks-app
npm run dev
```

---

# 🎛️ Root Config - Orquestrador Single SPA

> **Descrição**: Configuração do orquestrador Single SPA que coordena e gerencia os micro frontends.

---

## 📁 Criar Estrutura do Projeto

```bash
mkdir root-config
cd root-config
npm init -y
```

## 📦 package.json

Configuração mínima com o servidor de arquivos estáticos.

```json
{
  "name": "root-config",
  "version": "1.0.0",
  "description": "Single SPA Root Config - Orquestrador",
  "scripts": {
    "start": "serve -l 9000 .",
    "dev": "serve -l 9000 ."
  },
  "devDependencies": {
    "serve": "^14.2.4"
  }
}
```

---

## 📂 Estrutura de Arquivos do Root Config

### 🌳 Árvore de Arquivos

```
root-config/
├── index.html
├── package.json
└── .gitignore
```

### Script de Criação

```powershell
# Arquivos
New-Item index.html -ItemType File -Force
New-Item .gitignore -ItemType File -Force
```

---

## 📄 index.html

Página principal que gerencia o roteamento entre os micro frontends.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Manager - Micro Frontends</title>
  
  <!-- Estilos PrimeReact e PrimeFlex via CDN -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/primereact/resources/themes/lara-light-blue/theme.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/primereact/resources/primereact.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/primeicons/primeicons.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/primeflex/primeflex.css">
  
  <style>
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid #f3f3f3;
      border-top: 5px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  </style>
</head>
<body>
  <!-- Loading indicator -->
  <div id="loading" class="flex flex-column justify-content-center align-items-center min-h-screen gap-3">
    <div class="spinner"></div>
    <span class="text-xl">Carregando Task Manager...</span>
  </div>
  
  <!-- Containers para os micro frontends -->
  <div id="auth-app"></div>
  <div id="tasks-app"></div>
  
  <script>
    // Navegação entre apps baseada em rota
    const path = window.location.pathname;
    const token = localStorage.getItem('token');
    
    // Função de navegação global
    window.singleSpaNavigate = function(url) {
      window.location.href = url;
    };
    
    // Lógica de roteamento
    if (token) {
      // Usuário autenticado → redirecionar para tasks-app
      window.location.href = 'http://localhost:3002';
    } else {
      // Usuário não autenticado → redirecionar para auth-app
      window.location.href = 'http://localhost:3001';
    }
    
    // Escutar eventos de autenticação
    window.addEventListener('auth:login', function(event) {
      console.log('✅ Login realizado:', event.detail);
      window.location.href = 'http://localhost:3002';
    });
    
    window.addEventListener('auth:logout', function() {
      console.log('👋 Logout realizado');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'http://localhost:3001';
    });
  </script>
</body>
</html>
```

---

## 📄 .gitignore

Arquivos e pastas a serem ignorados pelo Git.

```
node_modules/
```

---

## 📥 Instalar Dependências

```bash
cd root-config
npm install
```

---

## ▶️ Executar o Root Config

```bash
# Desenvolvimento
npm run dev

# ou
npm start
```

O root-config estará disponível em: **http://localhost:9000**

---

# 🌐 Mapa de Portas

Tabela com as portas de todos os serviços da aplicação.

| App | Porta | URL |
|-----|-------|-----|
| **Backend (API)** | 3000 | http://localhost:3000 |
| **Auth App** | 3001 | http://localhost:3001 |
| **Tasks App** | 3002 | http://localhost:3002 |
| **Root Config** | 9000 | http://localhost:9000 |
