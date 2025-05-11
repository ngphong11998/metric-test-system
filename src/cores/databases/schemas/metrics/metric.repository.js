const db = require('../../postgresql');

const create = async ({ type, date, value }) => {
    const result = await db.pool.query(
        `INSERT INTO metrics (type, date, value)
            VALUES ($1, $2, $3)
            RETURNING *`,
        [type, date, value]
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

const getChart = async (filter) => {
    const { type, fromDate, toDate } = filter
    let query = `
            SELECT DISTINCT ON (DATE(date)) 
                DATE(date) AS date, value
            FROM metrics
            WHERE 1=1
        `;
    const params = [];

    if (type) {
        params.push(type);
        query += ` AND type = $${params.length}`;
    }

    if (fromDate) {
        params.push(fromDate);
        query += ` AND date >= $${params.length}`;
    }

    if (toDate) {
        params.push(toDate);
        query += ` AND date <= $${params.length}`;
    }

    query += `
            ORDER BY date DESC
        `;

    console.log(query)

    const result = await db.pool.query(query, params);
    return result.rows;
};

module.exports = {
    create,
    findById,
    filter,
    getChart
}