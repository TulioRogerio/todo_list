# ⚙️Arquivos Gerais

## 🎯  .gitignore — Define arquivos e pastas ignorados pelo Git

```typescript
// na raiz do projeto
node_modules
.env
```
## 🎯  tsconfig.json — Configuração do compilador TypeScript

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}
```

## 🎯 Variáveis de Ambiente (.env) — Configurações sensíveis do ambiente

> ⚠️ **IMPORTANTE**: 
> - Altere `SUA_SENHA` pela senha do PostgreSQL
> - Altere `NOME_DO_BANCO` pelo nome do banco no PostgreSQL
> - `JWT_SECRET` deve ter no mínimo 32 caracteres em produção
> - Nunca commite o `.env` no repositório

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
JWT_SECRET="sua-chave-secreta-muito-forte-aqui-min-32-chars"
PORT=3000
```

---
# ⚙️ Arquivos do Prisma

## 🎯 schema.prisma — Define os modelos e relacionamentos do banco de dados

**Arquivo:** `prisma/schema.prisma`
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  password String
  name     String?
  tasks    Task[]
}

model Task {
  id          Int       @id @default(autoincrement())
  title       String
  description String?
  done        Boolean   @default(false)
  dueDate     DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  userId      Int
  user        User      @relation(fields: [userId], references: [id])
}
```

**Convenções**:
- `@id @default(autoincrement())` para IDs numéricos
- `@unique` para campos únicos como email
- `@default(now())` para timestamps de criação
- `@updatedAt` para timestamps de atualização automática
- `@relation` explícito para foreign keys
- Campos opcionais com `?`

## 🎯 Inicializar Prisma

```bash
# Gerar client e criar migration
npx prisma migrate dev --name migracao_inicial

# Visualizar banco
npx prisma studio

# Insira um usuário de teste no banco usando o bcrypt
https://bcrypt-generator.com
```

## 🎯 prisma.service.ts — Serviço de conexão e gerenciamento do Prisma Client

**Arquivo:** `src/prisma/prisma.service.ts`
```typescript
// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

## 🎯 prisma.module.ts — Módulo global para disponibilizar o PrismaService

**Arquivo:** `src/prisma/prisma.module.ts`
```typescript
// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()  // Torna disponível globalmente
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

## 🎯 Padrão de Conversão de Datas

**CRÍTICO**: Datas vêm do frontend como strings ISO e devem ser convertidas.

```typescript
// ✅ CORRETO
dueDate: createDto.dueDate ? new Date(createDto.dueDate) : null

// ❌ ERRADO - Não converte a string
dueDate: createDto.dueDate
```

---
#  ⚙️ Backend Auth Patterns (JWT + Passport)

## 📌 O que é este arquivo?
Descreve como implementar autenticação JWT com Passport no NestJS.

## 🎯 auth.service.ts — Lógica de autenticação, registro e login

```typescript
// src/auth/auth.service.ts

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Verificar se usuário já existe
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) {
      throw new ConflictException('User already exists');
    }

    // Hash da senha (salt = 10)
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
      },
    });

    return {
      message: 'User created successfully',
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    
    // Verificar credenciais
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Gerar JWT
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
}
```

## 🎯 auth.controller.ts — Endpoints de login e registro

```typescript
// src/auth/auth.controller.ts

import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

```

## 🎯 jwt.strategy.ts — Estratégia de validação de tokens JWT

```typescript
// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: any) {
    // Retorna objeto que será anexado a req.user
    return { id: payload.sub, email: payload.email };
  }
}
```


## 🎯 auth.module.ts — Módulo de autenticação com JWT e Passport

```typescript
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' }, // Standard expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```


## 🎯 login.dto.ts — Validação dos dados de login

```typescript
// src/auth/dto/login.dto.ts

import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
```


## 🎯 register.dto.ts — Validação dos dados de registro

```typescript
//src/auth/dto/register.dto.ts

import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  name?: string;
}
```

## 🎯 users.service.ts — Serviço para buscar lista de usuários

**Arquivo:** `src/users/users.service.ts`
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    });
  }
}
```

## 🎯 users.module.ts

**Arquivo:** `src/users/users.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

```

## 🎯 reports.service.ts — Serviço para buscar relatórios (exemplo dummy)

**Arquivo:** `src/reports/reports.service.ts`
```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  getAll() {
    return [
      { id: 1, title: 'Report dummy' }
    ];
  }
}
```

## 🎯 reports.module.ts

**Arquivo:** `src/reports/reports.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Module({
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}

```


# ⚙️ Backend Tasks Patterns (NestJS)

## 📌 O que é este arquivo?
Descreve como implementar controllers, services e modules no backend NestJS. Cada exemplo é operável.

---

## 🎯 tasks.controller.ts — Controller de rotas CRUD para tarefas

**Regra**: Controllers usam decorators, injetam services e delegam lógica de negócio.

```typescript
// src/tasks/tasks.controller.ts

// ✅ CORRETO - Controller delega para Service
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))  // Proteção JWT em todas as rotas
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Request() req, @Body() createDto: CreateTaskDto) {
    return this.tasksService.create(req.user.id, createDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.tasksService.findOne(req.user.id, +id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateDto: UpdateTaskDto) {
    return this.tasksService.update(req.user.id, +id, updateDto);
  }

  @Patch(':id/toggle')
  toggle(@Request() req, @Param('id') id: string) {
    return this.tasksService.toggle(req.user.id, +id);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.tasksService.remove(req.user.id, +id);
  }
}
```

**Convenções**:
- `@UseGuards(AuthGuard('jwt'))` protege rotas autenticadas
- `@Request() req` acessa dados do usuário JWT decodificado
- `+id` converte string para number

---

## 🎯 tasks.service.ts — Lógica de negócio para operações com tarefas

**Regra**: Services contêm toda lógica de negócio e interagem com Prisma.

```typescript
// src/tasks/tasks.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: createDto.title,
        description: createDto.description,
        dueDate: createDto.dueDate ? new Date(createDto.dueDate) : null,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async findOne(userId: number, id: number) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(userId: number, id: number, updateDto: UpdateTaskDto) {
    await this.findOne(userId, id);  // Verifica ownership
    return this.prisma.task.update({
      where: { id },
      data: {
        ...updateDto,
        dueDate: updateDto.dueDate !== undefined 
          ? (updateDto.dueDate ? new Date(updateDto.dueDate) : null)
          : undefined,
      },
    });
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);  // Verifica ownership
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async toggle(userId: number, id: number) {
    const task = await this.findOne(userId, id);
    return this.prisma.task.update({
      where: { id },
      data: { done: !task.done },
    });
  }
}
```

**Convenções**:
- `@Injectable()` para injeção de dependência
- Sempre verificar ownership antes de operações
- Conversão de datas: `new Date(stringDate)` ou `null`

---

## 🎯 tasks.module.ts — Módulo que agrupa controller e service de tarefas

**Regra**: Modules agrupam controllers e services relacionados.

```typescript
// src/tasks/tasks.module.ts

import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
```

---

## 🎯 create-task.dto.ts — Validação dos dados de criação de tarefa

**Regra**: DTOs usam `class-validator` para validação automática.

```typescript
// src/tasks/dto/create-task.dto.ts

import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
```

## 🎯 update-task.dto.ts — Validação dos dados de atualização de tarefa

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
```

**Convenções**:
- `@IsNotEmpty()` para campos obrigatórios
- `@IsOptional()` para campos opcionais
- `@IsDateString()` para datas em formato ISO

---

## 🎯 main.ts — Ponto de entrada e configuração da aplicação NestJS

```typescript
// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();  // Habilita CORS para micro frontends
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,           // Remove campos não definidos no DTO
    forbidNonWhitelisted: false,
    transform: true,           // Transforma payloads em instâncias de DTO
  }));
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

---

## 🎯 app.module.ts — Módulo raiz que importa todos os módulos da aplicação

```typescript
// src/app.module.ts

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, TasksModule],
})
export class AppModule {}
```

---
# ⚙️ Backend Roles Patterns (Permissões e RLS)

## 📌 O que é este arquivo?
Descreve como implementar sistema de permissões com roles, guards customizados e Row Level Security.

---

## 🎯 schema.prisma (com Roles) — Define modelos com suporte a roles e multi-tenancy

**Arquivo:** `prisma/schema.prisma`
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
  MANAGER
}

model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  password String
  name     String?
  role     Role    @default(USER)   // ⭐ Campo de role
  tasks    Task[]
  
  // Multi-tenancy (opcional)
  organizationId Int?
  organization   Organization? @relation(fields: [organizationId], references: [id])
}

model Organization {
  id    Int     @id @default(autoincrement())
  name  String
  users User[]
  tasks Task[]
}

model Task {
  id          Int       @id @default(autoincrement())
  title       String
  description String?
  done        Boolean   @default(false)
  dueDate     DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  userId      Int
  user        User      @relation(fields: [userId], references: [id])
  
  // Multi-tenancy
  organizationId Int?
  organization   Organization? @relation(fields: [organizationId], references: [id])
}
```

---
## 🎯 Inicializar Prisma

```bash
# Gerar client e criar migration
npx prisma migrate dev --name migracao_rls

# Visualizar banco (opcional)
npx prisma studio
```


## 🎯 roles.decorator.ts — Decorator para definir roles permitidas em rotas

**Arquivo:** `src/auth/decorators/roles.decorator.ts`
```typescript
// src/auth/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
```

---

## 🎯 roles.guard.ts — Guard que verifica se o usuário tem a role necessária

**Arquivo:** `src/auth/guards/roles.guard.ts`
```typescript
// src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Buscar roles necessárias definidas no decorator
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se não tem roles definidas, permite acesso
    if (!requiredRoles) {
      return true;
    }

    // Buscar usuário do request (anexado pelo JwtStrategy)
    const { user } = context.switchToHttp().getRequest();
    
    if (!user || !user.role) {
      throw new ForbiddenException('Usuário não autenticado ou sem role');
    }

    // Verificar se usuário tem alguma das roles necessárias
    const hasRole = requiredRoles.some((role) => user.role === role);
    
    if (!hasRole) {
      throw new ForbiddenException('Acesso negado: permissão insuficiente');
    }

    return true;
  }
}
```

---

## 🎯 jwt.strategy.ts (com Role) — Estratégia JWT que inclui role do usuário

**Arquivo:** `src/auth/jwt.strategy.ts`
```typescript
// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: any) {
    // Buscar usuário com role atualizada do banco
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, role: true, organizationId: true },
    });

    if (!user) {
      return null;
    }

    // Retorna objeto que será anexado a req.user
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId, // Para multi-tenancy
    };
  }
}
```

---

## 🎯 admin.controller.ts — Controller com rotas protegidas por roles (exemplo)

**Arquivo:** `src/admin/admin.controller.ts` (Exemplo)
```typescript
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles, Role } from '../auth/decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)  // ⭐ Ambos os guards
@Controller('admin')
export class AdminController {

  // Apenas ADMIN pode acessar
  @Roles(Role.ADMIN)
  @Get('users')
  getAllUsers() {
    return this.userService.findAll();
  }

  // ADMIN ou MANAGER podem acessar
  @Roles(Role.ADMIN, Role.MANAGER)
  @Get('reports')
  getReports() {
    return this.reportService.getAll();
  }

  // Qualquer usuário autenticado (sem @Roles)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
```

---

## 🎯 tasks.service.ts (com RLS) — Service com Row Level Security no acesso aos dados

**Arquivo:** `src/tasks/tasks.service.ts` (Exemplo de RLS)
```typescript
// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: createDto.title,
        description: createDto.description,
        dueDate: createDto.dueDate ? new Date(createDto.dueDate) : null,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async findOne(userId: number, id: number) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(userId: number, id: number, updateDto: UpdateTaskDto) {
    await this.findOne(userId, id);
    return this.prisma.task.update({
      where: { id },
      data: {
        ...updateDto,
        dueDate: updateDto.dueDate !== undefined 
          ? (updateDto.dueDate ? new Date(updateDto.dueDate) : null)
          : undefined,
      },
    });
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async toggle(userId: number, id: number) {
    const task = await this.findOne(userId, id);
    return this.prisma.task.update({
      where: { id },
      data: { done: !task.done },
    });
  }
}
```

---

## 🎯 tasks.controller.ts (com RLS) — Controller com proteção de roles e RLS

**Arquivo:** `src/tasks/tasks.controller.ts` (Exemplo de RLS)
```typescript
// src/tasks/tasks.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles, Role } from '../auth/decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Request() req, @Body() createDto: CreateTaskDto) {
    return this.tasksService.create(req.user.id, createDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.tasksService.findOne(req.user.id, +id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateDto: UpdateTaskDto) {
    return this.tasksService.update(req.user.id, +id, updateDto);
  }

  @Patch(':id/toggle')
  toggle(@Request() req, @Param('id') id: string) {
    return this.tasksService.toggle(req.user.id, +id);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.tasksService.remove(req.user.id, +id);
  }
}
```

---

## 🎯 auth.controller.ts (Admin) — Controller de administração com verificação de roles

```typescript
// src/auth/auth.controller.ts

import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles, Role } from '../auth/decorators/roles.decorator';
import { UsersService } from '../users/users.service';
import { ReportsService } from '../reports/reports.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)  // ⭐ Ambos os guards
@Controller('admin')
export class AuthController {

  constructor(
    private userService: UsersService,
    private reportService: ReportsService
  ) {}

  // Apenas ADMIN pode acessar
  @Roles(Role.ADMIN)
  @Get('users')
  getAllUsers() {
    return this.userService.findAll();
  }

  // ADMIN ou MANAGER podem acessar
  @Roles(Role.ADMIN, Role.MANAGER)
  @Get('reports')
  getReports() {
    return this.reportService.getAll();
  }

  // Qualquer usuário autenticado (sem @Roles)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
```
## 🎯 app.module.ts — Módulo raiz (registro opcional de guards globais)

**Arquivo:** `src/app.module.ts`
```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, TasksModule],
})
export class AppModule {}
```


---

## 🎯 Hierarquia de Permissões Sugerida

| Role        | Permissões                                      |
| ----------- | ----------------------------------------------- |
| **USER**    | CRUD apenas em seus próprios recursos           |
| **MANAGER** | Visualiza recursos de sua organização/equipe    |
| **ADMIN**   | Acesso completo, gerencia usuários e permissões |

---
## 🎯 Compilando

```powershell
npm run build

npm start dev
```

## 🎯 Removendo erros do VS Code

 Se o VS Code ainda mostrar algum sublinhado vermelho, experimente reiniciar a janela do editor (Ctrl+Shift+P -> "Developer: Reload Window"), pois às vezes o servidor de linguagem demora para perceber a mudança externa na node_modules.


##  🎯 Retornar para o Readme-zero-point

> Retorne para [[`README-zero-point-0.1.0`]] para rodar o backend.
