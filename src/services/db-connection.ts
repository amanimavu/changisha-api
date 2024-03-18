import 'dotenv/config'
import mysql from 'mysql2/promise'
import dbConfig from 'configs/db.json'
import { drizzle } from 'drizzle-orm/mysql2'
import * as schema from 'models/drizzle/schema.js'

const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    database: dbConfig.db_name,
    password: process.env.DB_PASSWORD ?? '',
})

export const db = drizzle(connection, { schema, mode: 'default' })
