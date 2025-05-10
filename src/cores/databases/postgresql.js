const { Pool } = require('pg');
require('dotenv').config();

const migrate = require('./migrate')

const db = {
    pool: null,
    connect: null
}

db.connect = async () => {
    try {
        const {
            DB_HOST: host,
            DB_PORT: port,
            DB_USER: user,
            DB_NAME: database,
            DB_PASSWORD: password
        } = process.env

        const pool = new Pool({
            user,
            host,
            port,
            database,
            password,
        })
        db.pool = pool
        console.log(`DATABASE POSTGRES: connect success to ${host}:${port}`)

        // create table
        await migrate.create_schema(pool)
    } catch (error) {
        console.log(`Connect database error: ${error?.message || JSON.stringify(error)}`)
        throw new Error(`Connect database error: ${error?.message || JSON.stringify(error)}`)
    }
}

module.exports = db