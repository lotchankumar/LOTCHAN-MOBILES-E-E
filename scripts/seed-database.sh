#!/bin/bash
# Script to seed the database after migrations
# This can be run manually or as part of a deployment process

set -e

echo "🌱 Starting database seeding..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is not set"
    exit 1
fi

# Run the seed script
cd /app
npx tsx prisma/seed.ts

echo "✅ Database seeding completed!"