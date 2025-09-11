import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Configure connection pool with proper settings for Neon serverless
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 10,  // Maximum number of connections in the pool
  idleTimeoutMillis: 30000,  // Close idle connections after 30 seconds
  connectionTimeoutMillis: 10000,  // Wait 10 seconds for connection
});

// Add error handling for the pool
pool.on('error', (err) => {
  console.error('Database pool error:', err);
});

// Add connection event logging
pool.on('connect', () => {
  console.log('Database pool: New connection established');
});

pool.on('remove', () => {
  console.log('Database pool: Connection removed');
});

export const db = drizzle({ client: pool, schema });