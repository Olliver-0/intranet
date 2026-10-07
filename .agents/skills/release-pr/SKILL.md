---
name: release-pr
description: Used to create a Release Pull Request
---

Create a Release PR (from develop to main) following these rules:
- Follow the pattern already used in the project.
- Use english.
- Don't forget to fill the fields of assignee (the user), labels, and projects (with the status In Review/Testing)


Release v0.2.0: Core Infrastructure & Authentication System- #43

### ðŸ“‹ Overview
This major release marks the transition from an empty monorepo (`v0.1.0`) to a fully functional, secured, and brand-aligned application. We have implemented the entire backbone of the Brenner Portal, including the database layer, global API infrastructure, and a robust JWT-based authentication system with a corporate-standard UI.

---

#### ðŸ—ï¸ 1. Backend & Infrastructure (The Foundation)
* **Database Engine**: Implemented Prisma ORM (v6) with a normalized schema for Users, Departments, Categories, and Wiki content.
* **API Resilience**: Developed a centralized global error handler and a custom `AppError` utility to ensure structured JSON responses.
* **Security First**: Integrated Helmet and CORS for header protection and established a graceful shutdown strategy for our Synology NAS environment.
* **DX & Tooling**: Migrated to `tsx` (Node v24/ESM) and standardized monorepo orchestration via NPM Workspaces.

#### ðŸ›¡ï¸ 2. Security & Authentication (The Shield)
* **JWT Strategy**: Implemented a stateless authentication flow with secure HttpOnly and SameSite=Strict cookie delivery.
* **Identity Management**: Established Bcrypt-based password hashing, Zod payload validation, and a `/api/users/me` endpoint for session recovery.
* **Access Control**: Developed a multi-layer guard system featuring `authMiddleware` (Backend) and `ProtectedRoute`/`PublicRoute` (Frontend) using React Router v7.
* **Navigation Logic**: Created the `RootDispatcher` to manage the app's entry point, eliminating "flashes of unauthenticated content".

#### ðŸŽ¨ 3. Design System & Frontend (The Identity)
* **Modern Styling**: Replaced PostCSS with the `@tailwindcss/vite` plugin and established a standardized numerical neutral scale.
* **Branding**: Integrated local hosting for `Funnel_Display` and `Funnel_Sans` fonts to align with the Brenner brand.
* **Component Library**: Built a core set of accessible UI components (`Button`, `Input`) using `tailwind-merge` and `cn` utilities.
* **API Client**: Initialized a centralized Axios client with global interceptors for automated 401 session handling.

#### ðŸ§ª 4. Quality Assurance & DevOps (The Stability)
* **Automated CI/CD**: Engineered a GitHub Actions pipeline with Dockerized PostgreSQL services to run integration tests on every push.
* **Testing Culture**: Achieved high coverage with Vitest across the stack, including Backend integration tests, Frontend unit tests (jsdom), and complex routing mocks.
* **Environment Strategy**: Established a multi-tier environment config (`.env.test`, `.env.staging`, `.env.prod`) tailored for both Local and NAS deployment.

---

#### ðŸ“¦ Release Metadata
* **Previous Version**: `0.1.0`
* **New Version**: `0.2.0`
* **Milestone**: Authentication & Access Control (Complete)
* **Total Scope**: Database Schema, API Infra, Auth System, UI Foundation, Routing Guards.


Release v0.8.0: Profile Management & Access Security- #73

### ðŸ“‹ Overview
This release significantly elevates the Brenner Portal's security posture and user autonomy. We are introducing mandatory first-access password changes, a comprehensive user profile management dashboard, and a highly resilient state hydration architecture. These features ensure that the initial onboarding is secure and the global session state remains perfectly synchronized across the application.

---

#### ðŸ›¡ï¸ 1. Security & Authentication (The Shield)
* **First-Access Guard**: Implemented the `mustChangePassword` Boolean flag directly in the Prisma `User` schema.
* **Authentication Flow**: Upgraded the auth service to strictly intercept default credentials, preventing JWT generation and enforcing immediate password reset on the user's first login.
* **IDOR Prevention**: Hardened the backend profile update logic by ignoring injected IDs and relying strictly on the authenticated token session, ensuring users can only mutate their own data.

#### ðŸ‘¤ 2. User Profile Management (The Identity)
* **Profile Dashboard**: Built the `ProfilePage` utilizing `React Hook Form` and `Zod`.
* **Cross-Field Validation**: Implemented complex conditional validation via Zod's `superRefine` to safely process password modifications without corrupting database hashes.
* **Secure Hashing**: Enforced `Bcrypt` standards on the API side when storing updated credentials.

#### ðŸŽ¨ 3. UX & State Management (The Experience)
* **Contextual UI**: Refactored the Header to display the user's actual Department name instead of their technical system Role, improving the corporate experience.
* **Resilient Hydration**: Optimized the `AuthContext` with functional state merging to prevent critical data loss (e.g., department relations dropping out of memory) when closing welcome modals or performing partial updates.
* **Clean Code**: Polished loading skeletons and error boundary feedback across the `DashboardPage`, `ContactsPage`, and `DocumentsPage`.

#### ðŸ§ª 4. Testing & Quality Assurance (The Stability)
* **Test Refactoring**: Injected dynamic `mustChangePassword: false` seeds during integration testing to bypass the new security blocks cleanly.
* **Type Safety**: Resolved TS2339 union type ambiguities in `AuthResult` using explicit assertions, strictly aligning the frontend with the backend contracts.
* **100% Passing Rate**: Validated the complete API and Web test suites using Vitest and Supertest.

---

#### ðŸ“¦ Release Metadata
* **Previous Version**: `0.7.1`
* **New Version**: `0.8.0`
* **Milestone**: First-Access Protocol & Profile Update
* **Total Scope**: Mandatory Password Change, Profile UI, State Hydration Fixes, IDOR Security Tests.
