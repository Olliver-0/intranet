# 🚀 Brenner Portal

Professional monorepo designed for Brenner Soluções internal management and process digitalization.

## 🏗️ Architecture & Stack

- **Monorepo Strategy**: Managed via **NPM Workspaces**.
- **Backend (apps/api)**: Node.js (v24+) + Express + Prisma ORM + PostgreSQL.
- **Frontend (apps/web)**: React + Vite + TypeScript + Tailwind CSS.
- **Storage**: **MinIO** (S3-compatible object storage) for document and media management.
- **Infrastructure**: Containerized with **Docker**, hosted on **Synology NAS DS224+**.

## 📖 Documentation

All technical standards and governance policies are located in the `docs/` folder:

- [System Architecture](docs/ARCHITECTURE.md): Environmental logic and server structure.
- [Governance & Workflow](docs/GOVERNANCE.md): Branching, commits, and language policies.

## 🛠️ Getting Started

### 1. Environment Configuration

The application strictly follows multi-environment configurations. You must create the respective `.env` files based on the `.env.example` templates across three locations (**Root**, **apps/api**, **apps/web**):

- **Local Development**: Uses `.env` (default) and `.env.test` (for Vitest test suites).
- **Staging (NAS Dev)**: Uses `.env.staging`.
- **Production (NAS Prod)**: Uses `.env.production`.

_Note: Ensure all PostgreSQL and MinIO credentials match across the root infrastructure and the API application._

### 2. Local Development (PC)

For daily development on your local machine:

```bash
# 1. Start local infrastructure containers (PostgreSQL & MinIO)
docker-compose up -d

# 2. Install dependencies
npm install

# 3. Apply database migrations and seed default data
npm run prisma --workspace=api -- migrate dev
npm run db:seed --workspace=api

# 4. Start API (Terminal 1)
npm run dev:api

# 5. Start Web (Terminal 2)
npm run dev:web
```

### 3. NAS Deployment (Automation)

This project includes specialized NPM scripts for deployment on the Synology NAS via SSH, using project flags for environment isolation.

**Staging (Development Environment - Port 8080):**

```bash
sudo npm run nas:dev:up
sudo npm run nas:dev:migrate
sudo npm run nas:dev:seed
```

**Production (Live Environment - Port 8081):**

```bash
sudo npm run nas:prod:up
sudo npm run nas:prod:migrate
sudo npm run nas:prod:seed
```

_Useful utilities: Scripts like `nas:prod:logs:api`, `nas:prod:restart:api`, and `nas:prod:db:shell` are available in the root `package.json` for easy maintenance._

### 4. Quality Control

Ensure all foundational layers are stable before pushing changes or merging to `develop`:

```bash
# Validate Prisma schema
npm run db:validate

# Run ESLint & Prettier checks
npm run lint

# Run all test suites (API & Web)
npm run test
```
