---
name: merge-commit
description: Used o create merge commits
---

Merge the PR and create the merge commit following these rules:
- Follow the pattern already used in the project.
- Use english.

## Examples

Release v0.10.0: Trainings Module, Visual Design & Security Hardening (#83)

    This merge introduces the Trainings module, a centralized document viewer, significant visual design and UX improvements, and comprehensive security hardening along with automated test coverage.

    - Security & Testing: Hardened application endpoints with standard security headers using Helmet and configured a strict CSP. Implemented request body size limits, stricter data parsing, and SQL/XSS injection prevention wrappers. Set up robust Vitest/v8 coverage thresholds achieving 100% test coverage with unified scripts. Enhanced centralized error processing for clear, secure client feedback.
    - Features & Modules: Implemented a comprehensive end-to-end Trainings module. Introduced a unified document viewing component for processing and displaying files directly from MinIO. Added a robust image proxy to securely fetch and cache external/internal assets.
    - Design System & Frontend: Implemented a modern, refreshed visual design across the interface. Upgraded interactive elements, layout structures, and component responsiveness to provide a smoother and more engaging user experience.


Release v0.10.1: Production Migration Support & Dependency Fixes (#85)

    This merge resolves an issue preventing remote database migrations on the Synology NAS by bundling the Prisma CLI into the production Docker image.       

    - Backend & Infrastructure: Moved prisma to dependencies in apps/api/package.json to ensure availability under USER node in the multi-stage Docker production image, eliminating runtime EACCES errors. Cleaned up duplicated tsx entry in devDependencies.
