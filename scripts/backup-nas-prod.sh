#!/bin/bash

# NAS Production database daily backup script
set -e

# Dynamically resolve repository root path based on script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_PATH="$(cd "${SCRIPT_DIR}/.." && pwd)"
BACKUP_DIR="${REPO_PATH}/backups"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
OUTPUT_FILE="${BACKUP_DIR}/intranet_prod_${TIMESTAMP}.sql.gz"

mkdir -p "${BACKUP_DIR}"

echo "[$(date)] Starting production database backup..." >> "${BACKUP_DIR}/backup.log"

# Dump and compress on the fly
docker exec -t db-intranet-prod pg_dump -U intranet_admin -d intranet_prod | gzip > "${OUTPUT_FILE}"

# Remove backup files older than 30 days (Synology/BusyBox compatible)
find "${BACKUP_DIR}" -type f -name "intranet_prod_*.sql.gz" -mtime +30 -exec rm -f {} +

echo "[$(date)] Backup completed successfully: ${OUTPUT_FILE}" >> "${BACKUP_DIR}/backup.log"
