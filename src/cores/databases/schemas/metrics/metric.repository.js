const db = require('../../postgresql');

exports.create = async ({ type, date, value, unit }) => {
    const result = await db.pool.query(
        `INSERT INTO metrics (type, date, value, unit)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
        [type, date, value, unit]
    );
    return result.rows[0];
};

exports.findById = async (id) => {
    const result = await db.pool.query(`SELECT * FROM metrics WHERE id = $1`, [id]);
    return result.rows[0];
};

exports.filter = async ({ type, created_from, created_to }) => {
    let query = 'SELECT * FROM metrics WHERE 1=1';
    const params = [];

    if (type) {
        params.push(type);
        query += ` AND type = $${params.length}`;
    }
    if (created_from) {
        params.push(created_from);
        query += ` AND created_at >= $${params.length}`;
    }
    if (created_to) {
        params.push(created_to);
        query += ` AND created_at <= $${params.length}`;
    }

    query += ' ORDER BY created_at DESC';

    const result = await db.pool.query(query, params);
    return result.rows;
};