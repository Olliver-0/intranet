# Governance & Workflow - Brenner Portal

## 1. Branching Strategy

We maintain a clear separation between production-ready code and work-in-progress features:

- **main**: The production branch. It represents the stable state of the software.
- **develop**: The integration branch. All functional development is consolidated here before being moved to main.
- **Feature Branches**: Temporary branches created from develop for specific tasks (e.g., `feat/document-management`).

## 2. Merging Standards

To keep the history clean and readable, we follow these merge methods:

- **Feature → develop (Squash and Merge)**:
  - All individual commits from a task are condensed into a single atomic commit.
  - This removes "noise" from the history, such as minor fixes or work-in-progress updates.
- **develop → main (Merge Commit)**:
  - When a set of features is ready for production, we use a merge commit to main.
  - This preserves the historical record of major updates and project foundations.

## 3. Release & Versioning (SemVer)

We strictly follow Semantic Versioning (MAJOR.MINOR.PATCH) to track project maturity.

- **Release Process**: Before merging `develop` into `main`, the `version` in the root `package.json` and workspace packages must be updated to reflect the new state.
- **Tagging**: After a successful merge to `main`, a corresponding Git tag (e.g., `v1.6.2`) MUST be created to mark the stable release. This ensures deployment metadata is synchronized with the codebase.

## 4. Commit Standards

We follow the **Conventional Commits** specification (`type(scope): description`).

- Instead of maintaining a local list of types and scopes, refer to the official [Conventional Commits documentation](https://www.conventionalcommits.org/) for guidance as the project evolves.

## 5. GitHub Infrastructure & Security

The following automated tools are enabled to ensure project integrity:

- **Dependency Graph**: Actively maps all libraries used in the monorepo.
- **Dependabot**: Automatically monitors for vulnerabilities and suggests dependency updates.
- **Ruleset Enforcement**: Manual discipline is required to follow the Pull Request workflow instead of pushing directly to main, as strict branch rulesets require a GitHub Team plan.

## 6. Task Management

We use a simplified approach to project management:

- **Tasks**: All work is tracked as simple GitHub Issues.
- **Focus**: Prioritize clear titles and concise checklists within the issues to maintain momentum and avoid over-documentation. Close issues immediately upon merging the related PR.

## 7. Technical Standards

### 7.1 Error Handling

- **Pattern**: Every operational error must be thrown using a centralized `AppError` class.
- **Global Handler**: All exceptions are processed by the global `errorHandler` middleware to ensure a consistent structured JSON response.

### 7.2 Language Policy (RNF10)

- **Technical Content**: Source code, variable names, comments, technical documentation, and server logs MUST be in **English**.
- **User Interface**: All labels, messages, and content visible to the end-user MUST be in **Portuguese**.

### 7.3 Security

- **Headers**: The API must use `helmet` to secure HTTP headers and protect against common vulnerabilities.
- **Access Control**: CORS must be explicitly configured to allow requests only from authorized frontend origins.
- **Authentication**: JWT-based authentication is strictly required for protected routes.

### 7.4 Testing Policy

- **Requirement**: Core business logic, especially authentication and data validation, must be covered by tests using Vitest and Supertest.
- **Execution**: The command `npm run test` must pass across all workspaces before any code is merged into `develop` and `main`.

### 7.5 Asset Management

- **No Binary Commits**: Do not commit large binary files (PDFs, user uploads, manuals) to the repository. All user-generated files and media must be stored and served via the external object storage service (MinIO).
