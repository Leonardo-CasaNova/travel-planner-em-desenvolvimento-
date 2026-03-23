# 🌍 Travel Planner - Monorepo

<div align="center">
  
  **Planeje suas viagens de forma simples e organizada**
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📋 Sobre o Projeto

Travel Planner é uma aplicação web moderna e intuitiva para planejamento e gerenciamento de viagens. Com uma interface elegante e recursos completos, você pode organizar todas as suas aventuras em um só lugar.

Este projeto está organizado como um **monorepo**, contendo tanto o frontend quanto o backend em um único repositório.

## 📁 Estrutura do Monorepo

```
travel-planner/
├── backend/              # API NestJS
│   ├── src/
│   │   ├── auth/        # Módulo de autenticação
│   │   ├── viagens/     # Módulo de viagens
│   │   └── prisma/      # Configuração do Prisma
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── frontend/            # App Next.js
│   ├── app/
│   │   ├── dashboard/   # Página do dashboard
│   │   ├── login/       # Página de login
│   │   └── services/    # Serviços da API
│   └── package.json
│
├── .gitignore          # Ignora node_modules, .env, builds, etc
└── README.md           # Este arquivo
```

### ✨ Features

- 🔐 **Autenticação Segura** - Sistema completo de registro e login com JWT
- 📅 **Gestão de Viagens** - Crie, edite e exclua viagens com facilidade
- 🎨 **Interface Moderna** - Design responsivo e bonito com gradientes e animações
- 🚀 **Performance** - Frontend em Next.js 14 com App Router
- 🔒 **API REST** - Backend robusto com NestJS e validação de dados
- 💾 **Banco de Dados** - PostgreSQL com Prisma ORM
- 📱 **Responsivo** - Funciona perfeitamente em desktop e mobile

---

## 🛠️ Tecnologias

### Frontend
- **[Next.js 14](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização moderna e responsiva
- **[React Hooks](https://react.dev/)** - Gerenciamento de estado

### Backend
- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[Prisma](https://www.prisma.io/)** - ORM moderno para TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação com JSON Web Tokens
- **[Passport](http://www.passportjs.org/)** - Middleware de autenticação
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Hash de senhas
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação de DTOs

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v18 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** - Gerenciador de pacotes
- **PostgreSQL** (v14 ou superior) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Instalação e Configuração

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/travel-planner.git
cd travel-planner
```

### 2️⃣ Configure o Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/travel_planner?schema=public"
JWT_SECRET="sua_chave_secreta_super_segura_aqui"
```

Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

Inicie o servidor backend (na porta 3001):

```bash
npm run start:dev
```

### 3️⃣ Configure o Frontend

Em outro terminal, navegue para a pasta frontend:

```bash
cd ../frontend
npm install
```

Inicie o servidor de desenvolvimento (na porta 3000):

```bash
npm run dev
```

### 4️⃣ Acesse a aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Docs**: http://localhost:3001/api (se configurado)

---

## 💻 Desenvolvimento

### Rodando ambos os servidores

Para desenvolver com hot-reload em ambos frontend e backend, mantenha dois terminais abertos:

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Scripts Disponíveis

#### Backend (`/backend`)
```bash
npm run start:dev    # Inicia em modo desenvolvimento
npm run build        # Compila o projeto
npm run start        # Inicia em modo produção
npm run test         # Executa testes
npx prisma studio    # Abre interface visual do banco
```

#### Frontend (`/frontend`)
```bash
npm run dev          # Inicia em modo desenvolvimento
npm run build        # Compila o projeto
npm start            # Inicia em modo produção
npm run lint         # Executa o linter
```

---

## 🗄️ Banco de Dados

### Prisma Studio

Para visualizar e editar dados do banco de forma visual:

```bash
cd backend
npx prisma studio
```

### Migrations

Para criar uma nova migration após alterar o schema:

```bash
cd backend
npx prisma migrate dev --name nome_da_migration
```

---

## 📝 Estrutura da API

### Endpoints de Autenticação

```http
POST /auth/register     # Registrar novo usuário
POST /auth/login        # Login
```

### Endpoints de Viagens (protegidos)

```http
GET    /viagens         # Listar todas as viagens do usuário
POST   /viagens         # Criar nova viagem
PUT    /viagens/:id     # Atualizar viagem
DELETE /viagens/:id     # Deletar viagem
```

---

## 🎨 Interface

A aplicação possui:

- ✅ Tela de Login/Registro responsiva
- ✅ Dashboard com lista de viagens
- ✅ Formulários para criar/editar viagens
- ✅ Design moderno com gradientes e animações
- ✅ Feedback visual de loading e erros

---

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT com tokens seguros
- Validação de dados em todas as requisições
- Proteção de rotas no frontend e backend
- Variáveis de ambiente para dados sensíveis

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ 

---

## 📞 Suporte

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue!

---

<div align="center">
  
  **⭐ Não esqueça de dar uma estrela no projeto! ⭐**
  
</div>

```bash
npm run start:dev
```

O backend estará rodando em `http://localhost:3001`

### 3️⃣ Configure o Frontend

Em outro terminal:

```bash
cd frontend
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
travel-planner-web/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Schema do banco de dados
│   │   └── migrations/            # Histórico de migrações
│   ├── src/
│   │   ├── auth/                  # Módulo de autenticação
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwt-auth.guard.ts
│   │   ├── prisma/                # Módulo Prisma
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── viagens/               # Módulo de viagens
│   │   │   ├── viagens.controller.ts
│   │   │   ├── viagens.service.ts
│   │   │   └── dto/
│   │   │       └── create-viagem.dto.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   │   ├── dashboard/             # Página do dashboard
│   │   │   ├── DashboardViagens.tsx
│   │   │   └── page.tsx
│   │   ├── login/                 # Página de login
│   │   │   └── page.tsx
│   │   ├── services/              # Serviços da API
│   │   │   └── api.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/auth/register` | Registrar novo usuário | ❌ |
| POST | `/auth/login` | Login do usuário | ❌ |

**Exemplo de registro:**
```json
POST /auth/register
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Exemplo de login:**
```json
POST /auth/login
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

### Viagens

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/viagens` | Listar todas as viagens | ✅ |
| POST | `/viagens` | Criar nova viagem | ✅ |
| PUT | `/viagens/:id` | Atualizar viagem | ✅ |
| DELETE | `/viagens/:id` | Deletar viagem | ✅ |

**Exemplo de criação de viagem:**
```json
POST /viagens
Authorization: Bearer {token}
{
  "nome": "Paris, França",
  "dataInicio": "2026-06-15",
  "dataFim": "2026-06-22"
}
```

---

## 💾 Banco de Dados

### Schema Prisma

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  trips     Trip[]
  createdAt DateTime @default(now())
}

model Trip {
  id         String   @id @default(uuid())
  nome       String
  dataInicio DateTime @db.Date
  dataFim    DateTime @db.Date
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  createdAt  DateTime @default(now())
}
```

---

## 🎨 Screenshots

### Tela de Login
Interface moderna com gradientes e animações suaves.

### Dashboard
Gerenciamento completo de viagens com design responsivo.

---

## 🧪 Testes

### Backend
```bash
cd backend
npm run test           # Testes unitários
npm run test:e2e       # Testes end-to-end
npm run test:cov       # Cobertura de testes
```

### Frontend
```bash
cd frontend
npm run test
```

---

## 📝 Scripts Disponíveis

### Backend
- `npm run start` - Inicia o servidor em produção
- `npm run start:dev` - Inicia em modo de desenvolvimento
- `npm run build` - Compila o projeto
- `npx prisma studio` - Abre o Prisma Studio

### Frontend
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

---

## 🚀 Deploy

### Backend (Railway/Render/Heroku)

1. Configure as variáveis de ambiente no serviço de deploy
2. Execute as migrations: `npx prisma migrate deploy`
3. Deploy do código

### Frontend (Vercel/Netlify)

1. Conecte seu repositório
2. Configure a variável `BASE_URL` apontando para a API
3. Deploy automático

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

Desenvolvido com 💜

---

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) pela excelente documentação
- [NestJS](https://nestjs.com/) pelo framework poderoso
- [Prisma](https://www.prisma.io/) pelo ORM incrível
- Comunidade open source 🚀

---

<div align="center">
  
  **⭐ Se este projeto te ajudou, considere dar uma estrela!**
  
</div>
