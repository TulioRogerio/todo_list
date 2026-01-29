# Documentação — TodoList Single SPA

Esta documentação organiza o sistema a partir de **três olhares complementares e não sobrepostos**:

1. **📍 Ponto Zero** — como chegar exatamente ao estado inicial do sistema  
2. **📐 Arquitetura** — como o sistema é concebido, com as regras de desenvolvimento  
3. **🧩 Implementação** — como evoluir o sistema com segurança, utilizando o *Ponto Zero* e a *Arquitetura*

Essa separação é intencional e obrigatória para evitar confusão entre:
- estado inicial × estado arquitetural,
- setup × regra,
- decisão arquitetural × detalhe de implementação.

---

## 🧭 Como utilizar esta documentação

Antes de abrir qualquer arquivo, responda:

> **“Estou tentando chegar ao sistema, entendê-lo ou evoluí-lo?”**

Use o mapa abaixo como orientação.

---

## 📍 1. PONTO ZERO — Estado inicial do sistema

📁 **/ponto-zero**

Este bloco responde a uma única pergunta:

> **Como sair de uma máquina vazia e chegar exatamente ao estado inicial do sistema?**

### Regra
Aqui **não se discute arquitetura**, **não se define padrão** e **não se propõe melhorias**.  
A função deste bloco é a **reprodução fiel do estado inicial validado do sistema**.

### Conteúdo esperado

- **estado-atual.md**  
  Fotografia técnica do sistema no ponto inicial:  
  o que existe, o que funciona e quais fluxos mínimos estão disponíveis.

- **stack.md**  
  Stack validada com versões confirmadas  
  (Node, frameworks, banco de dados, ferramentas auxiliares).

- **instalacao-sequencial.md**  
  Passo a passo cronológico e linear para alcançar o ponto inicial do sistema.

- **validacoes.md**  
  Critérios objetivos para confirmar que o sistema está corretamente configurado.

---

## 📐 2. ARQUITETURA — Contexto e princípios

📁 **/architecture**

Este bloco responde:

> **Por que o sistema foi concebido dessa forma?**

Aqui estão definidos os **princípios estruturais** que **não devem ser violados**, independentemente da evolução do código.

### Arquivos

- **principles.md**  
  Princípios fundamentais do sistema  
  (micro frontends, sincronização full-stack, eventos, documentação como código).

- **system-overview.md**  
  Visão macro da arquitetura:  
  backend, frontends, orquestração e responsabilidades.

- **protocols.md**  
  Contratos entre as partes do sistema:  
  eventos globais, autenticação e comunicação entre aplicações.

### Regra

> Arquitetura **não ensina a instalar**,  
> Arquitetura **não descreve estrutura de pastas**,  
> Arquitetura **não contém código executável**.

---

## 🧩 3. IMPLEMENTAÇÃO — Evolução do sistema

📁 **/implementation**

Este bloco responde:

> **Como construir coisas novas respeitando a arquitetura existente?**

Ele **assume explicitamente** que:
- o **Ponto Zero foi alcançado**, e  
- a **Arquitetura foi compreendida**.

---

### 🧱 Padrões técnicos

📁 **/implementation/patterns**

Define **como o código deve ser escrito**, não onde ele está.

- **backend.md** — padrões NestJS  
- **auth.md** — autenticação e segurança  
- **database.md** — Prisma e banco de dados  
- **roles.md** — papéis e permissões  
- **frontend.md** — padrões de UI e integração  

---

### 🧰 Setup inicial

📁 **/implementation/setup**

Usado apenas para **configuração de ambiente partindo do zero**,  
não como referência de regra técnica ou arquitetural.

- setup-backend.md  
- setup-frontend.md  
- setup-root-config.md  

---

### 🧱 Guias de construção

📁 **/implementation/guides**

Passo a passo para criar novos elementos do sistema:

- new-module.md  
- new-page.md  
- new-microfrontend.md  
- new-ui.md  

---

### ⚙️ Operação e manutenção

📁 **/implementation/ops**

Documentação voltada para operação, diagnóstico e manutenção:

- deploy.md  
- troubleshooting.md  

---

## 🎨 Frontend por responsabilidade

📁 **/frontend**

Documentação específica por micro frontend.  
Aqui está o **onde** as regras se aplicam, não o **como** elas são definidas.

- auth-app.md  
- tasks-app.md  
- root-config.md  

---

## 🧪 Testes

📄 **testing.md**

Estratégia transversal de testes:
- backend  
- frontend  
- mocks  
- testes manuais de API  

---

## 🧠 Features e decisões de UI

📁 **/features**

Histórico de decisões, experimentações e refinamentos visuais.  
Não define padrão, apenas **contexto e motivação**.

- redesign-login.md  
- redesign-dashboard.md  

---

## 🤖 Para uso de Agentes de IA

Esta documentação foi desenhada para **seleção dinâmica de contexto**, evitando sobrecarga e ambiguidade.

Exemplos:
- Reproduzir sistema → `ponto-zero`  
- Entender decisões → `architecture`  
- Criar funcionalidade → `architecture + patterns + guides`  
- Corrigir bug → `patterns + ops`  

> **Regra**: Nunca carregar toda a documentação no prompt.

---

## 📌 Evitando iniciar situações não previstas

> **Se algo não está documentado em `/architecture` ou `/implementation/patterns`,  
> então não é uma regra do sistema.**  
>
> Caso seja realmente necessário, a funcionalidade **deve ser documentada primeiro**  
> na camada de Implementação antes de ser considerada válida.

---

© ToDoList App • Desafio da equipe do Conecta Sedu