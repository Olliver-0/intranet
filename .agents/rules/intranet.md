---
trigger: always_on
---

# Intranet Project Rules

These are the core guidelines, architectural patterns, and coding conventions for the Intranet monorepo project. You must strictly follow these rules when writing code, debugging, or creating new features.

## 1. General Architecture & Monorepo

- **Workspace**: This is an NPM Workspaces monorepo containing `apps/api` (Backend) and `apps/web` (Frontend).
- **Scripts**: Execute scripts from the root directory using the predefined package.json scripts (e.g., `npm run dev:api`, `npm run test:web`) or use the workspace flag (`npm run <script> --workspace=api|web`).
- **Docker**: The project heavily relies on Docker for development and production. Familiarize yourself with the `docker-compose` commands in the root `package.json` (e.g., `npm run nas:dev:up`, `npm run nas:prod:up`).
- **Post-Implementation Checks**: After major implementations or refactoring, ALWAYS run the following commands from the root to ensure stability:
  - `npm run lint` (Verifies ESLint rules)
  - `npm run build` (Ensures both apps build successfully)
  - `npm run test` or `npm run test:coverage` (Runs Vitest test suites)

## 2. Test Driven Development (TDD)

- **TDD is Mandatory**: You must follow Test Driven Development principles. Write failing tests for your new features, components, or services _before_ writing the actual implementation.
- **Coverage**: Ensure that edge cases, success scenarios, and error handling are comprehensively covered in the tests.

## 3. Backend Conventions (`apps/api`)

- **Tech Stack & Versions**:
  - Node.js (`24.12.0`)
  - TypeScript (`~5.9.3`)
  - Express (`^5.2.1`)
  - Prisma ORM (`^6.19.3`) with PostgreSQL
  - MinIO (`^8.0.7`) for Object/File Storage
  - Zod (`^4.3.5`) for validation
  - Vitest (`^4.0.16`) for testing
- **Module Structure**: The API follows a Domain-Driven / Feature-Based architecture located in `src/modules/`.
- **Naming Conventions**: When creating a new module (e.g., `users`), strictly use the following file pattern:
  - `user.controller.ts`: Handles HTTP requests/responses and invokes services.
  - `user.service.ts`: Contains business logic and database interactions.
  - `user.routes.ts`: Express router definitions.
  - `user.validation.ts`: Zod schemas for request payload validation.
  - `user.types.ts`: TypeScript interfaces and types specific to the module.
- **File Storage (MinIO)**: Any feature requiring file uploads, image processing, or document storage must interact with the MinIO client. Do not store files locally on the container/server disk.
- **Database**: Use Prisma Client for all database operations. If `prisma/schema.prisma` is modified, you must suggest running `npm run db:generate` and `npm run db:migrate:local`.

## 4. Frontend Conventions (`apps/web`)

- **Tech Stack & Versions**:
  - React (`^19.2.0`)
  - Vite (`^7.2.4`)
  - Tailwind CSS (`^4.1.18`)
  - React Router DOM (`^7.15.0`)
  - React Hook Form (`^7.72.1`) & Zod (`^4.3.6`)
  - Vitest (`^4.0.16`) for testing
- **Component Structure**: Components are located in `src/components/`.
  - Group components in their own PascalCase directory.
  - Use the component name for the file (e.g., `src/components/Alert/Alert.tsx`) rather than `index.tsx`.
  - Place tests inside `src/components/<ComponentName>/__tests__/`.
- **Forms & Validation**: Always use `react-hook-form` coupled with `@hookform/resolvers/zod` and `zod` for form state management and validation.
- **Styling**:
  - Use Tailwind CSS v4 utility classes exclusively.
  - Use `clsx` and `tailwind-merge` (typically wrapped in a `cn()` utility) for dynamic or conditional class names.
  - All colors, fonts and other global definitions must be used from `index.css`.
- **Routing**: Follow React Router v7 patterns, defining routes in `src/routes/` and page components in `src/pages/`.
- **API Integration**: Use `axios` for HTTP requests, centralized in `src/services/`.

## 5. Code Quality & Formatting

- **TypeScript**: Strict TypeScript is mandatory. Avoid using `any` at all costs. Provide accurate types or interfaces.
- **Prettier Settings**:
  - 2 spaces indentation (`tabWidth: 2`)
  - Single quotes (`singleQuote: true`)
  - Semi-colons required (`semi: true`)
  - Trailing commas everywhere (`trailingComma: 'all'`)
  - Print width: 80 characters
- **ESLint**: Ensure your generated code complies with the project's ESLint rules. Do not leave unused imports or variables.

## 6. Agent Instructions

- **Context Awareness**: Always verify which app (`api` or `web`) you are modifying and apply the specific rules for that app.
- **Specific Tools**: Use the most specific tool for tasks (e.g., `view_file` over `cat`, `grep_search` over `grep`).
- **Modifications**: When modifying existing files, preserve all comments and docstrings unrelated to your changes. Match the existing coding style of the file you are editing.