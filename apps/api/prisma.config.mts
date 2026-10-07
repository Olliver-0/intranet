import { defineConfig } from 'prisma/config';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, './.env') });

const prismaConfig = {
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  seed: {
    command: 'npx tsx prisma/seed.mts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
};

export default defineConfig(prismaConfig);
