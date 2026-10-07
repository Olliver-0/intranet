---
name: pr
description: Used to create a Pull Request
---

Create a PR (from current branch to develop) following these rules:
- Follow the pattern already used in the project.
- Use english.
- Don't forget to fill the fields of assignee (the user), labels, and projects (with the status In Review/Testing)

## Examples

feat(db/infra): implement database foundation and ci/cd orchestration- #29

### ðŸ“‹ Description
This PR establishes the core infrastructure for the Intranet Brenner project, focusing on the data layer and automated quality gates. It consolidates the backend schema, secure data seeding, and monorepo orchestration according to the project governance.

### ðŸš€ Key Changes

#### ðŸ—„ï¸ Database & Persistence
* **Prisma Setup**: Implemented the Prisma Schema (v6) including models for `User`, `Department`, `Category`, `Document`, and `WikiPage`.
* **Migrations**: Generated initial SQL definitions to support structural documentation and the wiki system.
* **Secure Seeding**: Developed a robust `seed.ts` script utilizing **Bcrypt** for secure admin password hashing and `upsert` logic to prevent data duplication.

#### âš™ï¸ Monorepo & Orchestration
* **Workspace Scripts**: Standardized `lint`, `build`, and `db:validate` commands at the root level using npm workspaces.
* **Environment**: Provided a documented `.env.example` to guide local environment setup.
* **Configuration Harmonization**: Migrated ESLint to **v9 (Flat Config)** using `.mjs` and `.mts` extensions to resolve module resolution conflicts in a CommonJS environment.

#### ðŸ¤– CI/CD Pipeline
* **GitHub Actions**: Created the `CI - Quality Check` workflow to automatically validate the database schema, enforce linting rules, and verify the production build on every PR to `develop`.

---

### ðŸ“ Technical Notes
* The project remains as **CommonJS** for stability, while specific infrastructure files use **ESM** (`.mjs`/`.mts`) to comply with modern tool requirements.
* A dummy `DATABASE_URL` is utilized in CI to allow Prisma Client generation without requiring a live database connection.




feat(db): update schema, fix monorepo linting, and stabilize environment- #31
### ðŸ“‹ Description
This PR consolidates the final adjustments to the data layer and developer experience (DX). It ensures the database schema is complete for the next phases and resolves environment configuration issues that were blocking the workflow, stabilizing both Dev and Test environments.

### ðŸš€ Key Changes

#### ðŸ—„ï¸ Database & Persistence
* **Schema Update**: Added `updated_at` fields to all models and implemented a `@unique` constraint on `Category.title` for data integrity.
* **Migrations**: Generated the SQL definitions required to sync the local database with the current schema and established the migration history.
* **Stable Seeding**: Refined the `seed.mts` script to be fully idempotent using `upsert` logic and ensured proper hashing for the initial admin user.

#### âš™ï¸ Monorepo & Orchestration
* **Linting Fix**: Adjusted `tsconfigRootDir` in ESLint configurations to resolve path resolution errors across the monorepo workspaces.
* **Workspace Automation**: Integrated root-level scripts (`db:generate`, `db:seed`, `db:migrate:local`) to streamline the setup process via npm workspaces.

---

### ðŸ“ Technical Notes
* The `seed.mts` now utilizes `tsx` with ESM support to handle TypeScript files within the CommonJS workspace without module resolution conflicts.
