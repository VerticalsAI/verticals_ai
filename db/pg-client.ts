// database.ts
import pg from 'pg';

let client: pg.Client;

export const getPgClient = async () => {
  if (!client) {
    console.log('pg', {
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: parseInt(process.env.PG_PORT || '5432', 10),
    })
    client = new pg.Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: parseInt(process.env.PG_PORT || '5432', 10),
    });
    await client.connect()
  }
  return client;
};