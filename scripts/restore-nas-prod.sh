#!/bin/bash

# Restores a compressed SQL dump into the production database
set -e

if [ -z "$1" ]; then
  echo "Error: Please provide the path to the backup file."
  echo "Usage: npm run nas:prod:restore -- backups/intranet_prod_YYYY-MM-DD_HH-MM-SS.sql.gz"
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Error: Backup file '$BACKUP_FILE' not found."
  exit 1
fi

echo "Starting database restoration from: $BACKUP_FILE..."

gzip -dc "$BACKUP_FILE" | docker exec -i db-intranet-prod psql -U intranet_admin -d intranet_prod

echo "Database restored successfully from $BACKUP_FILE"
