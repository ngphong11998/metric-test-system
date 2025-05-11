createUserSchema = async(pool) => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            email TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    `)
}

createMetricShema = async(pool) => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS metrics (
            id SERIAL PRIMARY KEY,
            type TEXT NOT NULL DEFAULT 'DISTANCE',
            date TIMESTAMPTZ DEFAULT NOW(),
            value REAL,
            created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
            updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    `)
}

create_schema = async (pool) => {
    await createUserSchema(pool)
    await createMetricShema(pool)
}

module.exports = {
    create_schema
}