import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
import path from 'path';

const { parsed } = dotenv.config({
    path: path.resolve(process.cwd(), '.env.local'),
});

export default defineConfig({
    schema: './src/lib/drizzle/schema/*',
    out: './drizzle',
    dialect: 'mysql',
    dbCredentials: {
        url: parsed?.DATABASE_URL!,
    },
});
