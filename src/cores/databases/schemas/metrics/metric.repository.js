const db = require('../../postgresql');

const create = async ({ type, date, value, unit }) => {
    const result = await db.pool.query(
        `INSERT INTO metrics (type, date, value, unit)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
        [type, date, value, unit]
    );
    return result.rows[0];
};

const findById = async (id) => {
    const result = await db.pool.query(`SELECT * FROM metrics WHERE id = $1`, [id]);
    return result.rows[0];
};

const filter = async (filters = {}, paginate = {}) => {
    const {
        type,
        created_from,
        created_to
    } = filters;

    const {
        page = 1,
        limit = 10,
        disable_paging = false
    } = paginate;

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

    let result, totalItems, totalPages;

    if (disable_paging) {
        result = await db.pool.query(query, params);
        totalItems = result.rowCount;
        totalPages = 1;

        return {
            items: result.rows,
            totalItems,
            totalPages,
            itemsPerPage: totalItems,
            pageIndex: 1
        };
    }

    const offset = (page - 1) * limit;
    params.push(limit, offset);
    query += ` LIMIT $${params.length - 1} OFFSET $${params.length}`;

    result = await db.pool.query(query, params);

    const countQuery = 'SELECT COUNT(*) FROM metrics WHERE 1=1' +
        (type ? ` AND type = '${type}'` : '') +
        (created_from ? ` AND created_at >= '${created_from}'` : '') +
        (created_to ? ` AND created_at <= '${created_to}'` : '');

    const totalResult = await db.pool.query(countQuery);
    totalItems = parseInt(totalResult.rows[0].count, 10);
    totalPages = Math.ceil(totalItems / limit);

    return {
        items: result.rows,
        totalItems,
        totalPages,
        itemsPerPage: limit,
        pageIndex: page
    };
};

module.exports = {
    create,
    findById,
    filter
}