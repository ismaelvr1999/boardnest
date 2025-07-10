#!/bin/sh
set -e

echo "Waiting for database..."

until ./wait-for-it.sh database:3306 --timeout=30 --quiet; do
  echo "Database not ready yet, retrying in 5 seconds..."
  sleep 5
done

echo "Database is ready, starting backend"
pnpm run dev
