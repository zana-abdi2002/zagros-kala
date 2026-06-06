import pg, { Pool, PoolClient } from "pg";
import "server-only";

// Configure type parsers BEFORE creating the pool
// This ensures pg returns the correct JavaScript types instead of strings

// BIGINT (type 20) - Parse to number
pg.types.setTypeParser(20, (val) => parseInt(val, 10));

// SMALLINT (type 21) - Parse to number
pg.types.setTypeParser(21, (val) => parseInt(val, 10));

// INTEGER (type 23) - Parse to number
pg.types.setTypeParser(23, (val) => parseInt(val, 10));

// FLOAT4 (type 700) - Parse to number
pg.types.setTypeParser(700, (val) => parseFloat(val));

// FLOAT8 (type 701) - Parse to number
pg.types.setTypeParser(701, (val) => parseFloat(val));

// NUMERIC/DECIMAL (type 1700) - Parse to number
// Note: For financial data requiring exact precision, consider keeping as string
pg.types.setTypeParser(1700, (val) => parseFloat(val));

// DATE (type 1082) - Keep as string for consistency
pg.types.setTypeParser(1082, (val) => val);

// TIMESTAMP (type 1114) - Parse to Date
pg.types.setTypeParser(1114, (val) => new Date(val));

// TIMESTAMPTZ (type 1184) - Parse to Date
pg.types.setTypeParser(1184, (val) => new Date(val));

// Singleton pool instance
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Graceful shutdown
    const cleanup = () => {
      if (pool) {
        pool.end();
        pool = null;
      }
    };

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
  }

  return pool;
}

export const db = getPool();

// Transaction wrapper
export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
