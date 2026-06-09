# JobFlow

JobFlow é uma aplicação full stack que conecta candidatos e empresas em processos de recrutamento simples e organizados.

A plataforma permite que empresas publiquem vagas e acompanhem candidatos, enquanto profissionais encontram oportunidades e monitoram o andamento de suas candidaturas.

## Objetivo

O objetivo do JobFlow é centralizar vagas, perfis e candidaturas em uma experiência clara para candidatos e empresas.

## Tecnologias Utilizadas

- Next.js com App Router
- TypeScript
- React
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Clerk
- React Hook Form
- Zod
- Vercel

## Funcionalidades

### Publicas

- Pagina inicial responsiva
- Listagem publica de vagas abertas
- Busca de vagas por titulo
- Filtros por modelo de trabalho, tipo de vaga e localizacao
- Pagina de detalhes da vaga

### Autenticacao

- Login e cadastro com Clerk
- Sincronizacao do usuario autenticado com a tabela `User`
- Onboarding para escolha do tipo de usuario
- Separacao entre candidato e empresa

### Area do candidato

- Criacao e edicao de perfil de candidato
- Envio de candidatura com mensagem opcional
- Bloqueio de candidatura duplicada
- Listagem das candidaturas enviadas
- Dashboard com indicadores de candidaturas

### Area da empresa

- Criacao e edicao de perfil de empresa
- Criacao, edicao e fechamento de vagas
- Listagem das vagas da empresa logada
- Visualizacao dos candidatos inscritos em cada vaga
- Alteracao do status das candidaturas
- Dashboard com indicadores de vagas e candidaturas recebidas

## Status do Projeto

Em desenvolvimento.

O projeto ja possui o fluxo principal de vagas, perfis, candidaturas e dashboards. Ainda existem melhorias planejadas, principalmente em refinamento visual, testes automatizados e experiencia de uso.

## Imagens e Prints

> Espacos reservados para prints do projeto.

### Pagina inicial

![Pagina inicial do JobFlow](./docs/screenshots/home.png)

### Listagem de vagas

![Listagem de vagas do JobFlow](./docs/screenshots/vagas.png)

### Dashboard do candidato

![Dashboard do candidato](./docs/screenshots/dashboard-candidato.png)

### Dashboard da empresa

![Dashboard da empresa](./docs/screenshots/dashboard-empresa.png)

## Como Rodar Localmente

### 1. Clone o repositorio

```bash
git clone https://github.com/seu-usuario/jobflow.git
cd jobflow
```

### 2. Instale as dependencias

```bash
npm install
```

### 3. Configure as variaveis de ambiente

Crie um arquivo `.env.local` com base no `.env.example`.

No Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

No macOS/Linux:

```bash
cp .env.example .env.local
```

Depois preencha as variaveis com os dados do PostgreSQL e do Clerk.

### 4. Rode as migrations

Em ambiente local:

```bash
npx prisma migrate dev
```

Em ambiente de producao:

```bash
npm run db:migrate
```

### 5. Rode o seed

O seed cria dados de exemplo para validar os fluxos de empresas, candidatos, vagas e candidaturas.

```bash
npm run seed
```

### 6. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Variaveis de Ambiente

Exemplo:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
PRISMA_USE_DIRECT_URL="0"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_or_pk_live_example"
CLERK_SECRET_KEY="sk_test_or_sk_live_example"

NEXT_PUBLIC_CLERK_SIGN_IN_URL=""
NEXT_PUBLIC_CLERK_SIGN_UP_URL=""
```

Observacoes:

- `DATABASE_URL` e usada pela aplicacao para conectar ao PostgreSQL.
- `DIRECT_URL` e opcional e pode ser usada para migrations, principalmente quando `DATABASE_URL` usa pooler.
- `PRISMA_USE_DIRECT_URL=1` faz os comandos do Prisma usarem `DIRECT_URL`.
- As URLs publicas do Clerk sao opcionais neste projeto enquanto o login e cadastro forem feitos por modal.

## Scripts Disponiveis

```bash
npm run dev          # inicia o servidor de desenvolvimento
npm run build        # gera o build de producao
npm run start        # inicia a aplicacao em modo producao
npm run lint         # executa o ESLint
npm run db:migrate   # aplica migrations em producao
npm run studio       # abre o Prisma Studio
npm run seed         # popula o banco com dados de exemplo
```

## Deploy

Link do deploy:

```text
https://jobflow-seu-deploy.vercel.app
```

> Substituir pelo link real apos publicar o projeto.

## Como Conferir os Dados

Para abrir o Prisma Studio:

```bash
npm run studio
```

Tabelas principais:

- `User`
- `CandidateProfile`
- `CompanyProfile`
- `Job`
- `Application`

## Aspectos Técnicos

O desenvolvimento do JobFlow envolve:

- Estrutura de projeto com Next.js App Router
- Criacao de rotas publicas e protegidas
- Autenticacao com Clerk
- Sincronizacao de usuario autenticado com banco de dados
- Modelagem de dados com Prisma
- Relacionamentos entre usuarios, perfis, vagas e candidaturas
- Validacao de formularios com Zod
- Formularios com React Hook Form
- Server Actions para operacoes no banco
- Filtros com `searchParams`
- Preparacao para deploy na Vercel

## Proximos Passos

- Refinar o design das telas internas
- Adicionar testes automatizados para os fluxos principais
- Criar uma pagina de detalhes da candidatura
- Permitir reabertura de vagas fechadas
- Adicionar paginacao na listagem publica de vagas
- Melhorar estados de loading e mensagens de erro
- Adicionar prints reais no README
