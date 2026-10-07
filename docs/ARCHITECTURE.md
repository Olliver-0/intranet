# System Architecture - Brenner Portal

## 1. Overview

The project is structured as a monorepo using **NPM Workspaces** to manage both the Frontend (React) and Backend (Node.js) in a single repository. The system is fully containerized with **Docker** and orchestrated via **Docker Compose** for hosting on a **Synology NAS DS224+**.

The core stack consists of:

- **Frontend**: React, Vite, Tailwind CSS.
- **Backend**: Node.js, Express, Prisma ORM.
- **Relational Database**: PostgreSQL.
- **Object Storage**: MinIO (S3-compatible) for handling documents, manuals, and heavy media.

## 2. API Bootstrapping Logic

To ensure a clean separation of concerns and facilitate integration testing, the API entry point is strictly divided into two files:

- **app.ts**: Defines the Express instance, security middlewares (Helmet, CORS), global error handlers, and route definitions. It **does not** start the HTTP listener.
- **server.ts**: The execution entry point. It loads environment variables, verifies critical infrastructure connections (like database reachability), handles the server startup logic, and manages graceful shutdowns (SIGTERM/SIGINT) to prevent data corruption during NAS reboots.

## 3. Environmental Management (Multi-Env Strategy)

We utilize a multi-file `.env` strategy to safely navigate between local development and the isolated NAS environments:

- **.env**: Local development configuration (connects to local Docker DB & MinIO).
- **.env.test**: Dedicated environment for **Vitest** integration tests.
- **.env.staging**: Homologation environment hosted on the NAS, accessible via port **8080**.
- **.env.production**: Production environment for the final deployment on the NAS, accessible via port **8081**.

> **Note**: Infrastructure settings (PostgreSQL/MinIO container names, ports, and volumes) are managed in the root `.env` files, while application-specific secrets are located within `apps/api/` and `apps/web/`.

## 4. Data Persistence & Volumes

Because Docker containers are ephemeral, we ensure data safety on the Synology NAS through strict volume mapping.

- **Database Volume**: PostgreSQL data is mapped directly to a local directory (e.g., `./docker/postgres/data`) to survive container restarts.
- **Object Storage Volume**: All files uploaded by the Marketing or Admin teams (PDFs, images) are persisted in the MinIO volume (e.g., `./docker/minio/data`).

_⚠️ Never delete these host directories, as they hold the canonical state of the Brenner Portal._

## 5. Architecture Diagram

The following diagram illustrates the high-level flow, user interaction, and data persistence layers:

```mermaid
flowchart TD
    User([Standard User]) --> Web
    Marketing([Marketing]) --> Web
    Admin([IT / Admin]) --> Web

    subgraph Synology NAS DS224+ [Docker Bridge Network]

        subgraph Brenner Portal Monorepo
            Web[Frontend - React/Vite]
            API[Backend - Node/Express]
        end

        DB[(PostgreSQL Database)]
        MinIO[(MinIO Object Storage)]
    end

    ExternalAPI[AwesomeAPI Dólar]

    Web -->|HTTP/REST| API
    API -->|Prisma TCP| DB
    API -->|S3 Protocol| MinIO
    Web -->|HTTP/GET (Public Assets)| MinIO
    API -->|HTTPS| ExternalAPI

    style Web fill:#ff3131,color:#fff,stroke:#b30000
    style API fill:#ff3131,color:#fff,stroke:#b30000
    style DB fill:#336791,color:#fff
    style MinIO fill:#c72c48,color:#fff
```

## 6. Database Backup & Disaster Recovery Routine

### 6.1 Automated Daily Backup (NAS Production)
Automated daily backups are managed by the Synology DSM **Task Scheduler** executing at 11:00 PM under `root` privileges.
- **Execution Script**: `scripts/backup-nas-prod.sh`
- **Storage Directory**: `backups/`
- **Compression & Retention**: Dumps are compressed as `.sql.gz` and automatically purged after 30 days (`find -mtime +30`).
- **Log Output**: `backups/backup.log`

### 6.2 Disaster Recovery & Restoration Procedures

#### A) Production NAS Restore
To restore a production state from a compressed `.sql.gz` backup file on the Synology NAS:

1. List available backup files in the backup directory:
   ```bash
   ls -la backups/
   ```

2. Execute the restoration using the NPM workspace script:
   ```bash
   npm run nas:prod:restore -- backups/FILENAME.sql.gz
   ```

3. Alternatively, execute the raw pipeline directly via SSH:
   ```bash
   sudo gzip -dc backups/FILENAME.sql.gz | sudo docker exec -i db-intranet-prod psql -U intranet_admin -d intranet_prod
   ```

#### B) Local Development Restore
To restore an uncompressed `.sql` dump into the local development container:

```bash
docker exec -i db-intranet psql -U intranet_admin -d intranet_dev < backups/FILENAME.sql
```

To restore a compressed production dump (`.sql.gz`) into your local development environment for debugging:

```bash
gzip -dc backups/FILENAME.sql.gz | docker exec -i db-intranet psql -U intranet_admin -d intranet_dev
```
