import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
}

const connection = mysql.createConnection({
    uri: process.env.DATABASE_URL,
});

export const db = drizzle(connection);
