---
name: squash-commit
description: Used to create Squash and Merge commits
---

Merge the PR and create the squash and merge commit following these rules:
- Follow the pattern already used in the project.
- Use english.

## Examples

feat(images): optimize image fetch with lazy loading and cache (#88)

    BACKEND & INFRASTRUCTURE:
    - Implemented lru-cache in ImageService to store optimized webp buffers.
    - Added a semaphore to limit concurrent MinIO fetches to MAX_CONCURRENT_FETCHES (5).
    - Shared fetch promises for identical requests to prevent cache stampedes.
    - Added 3-attempt retry with backoff for transient MinIO NoSuchKey errors.

    FRONTEND:
    - Added loading="lazy" to avatar images to defer requests until they enter the viewport.


fix(scripts): force root user for nas docker migrations (#86)

    BACKEND & INFRASTRUCTURE:
    - Added -u 0 (root user flag) to docker exec commands in nas:prod:migrate, nas:dev:migrate, and nas:dev:seed scripts.
    - Circumvents Synology NAS permission errors (EACCES) when executing Prisma migrations via Docker exec.
    - Ensures migrations run seamlessly without affecting the API service's non-root node user execution context.
