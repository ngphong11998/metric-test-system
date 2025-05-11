const metricRepo = require('../../../cores/databases/schemas/metrics/metric.repository');

exports.getList = async (query) => {
    const filters = {
        type: query?.type,
        created_from: query?.created_from,
        created_to: query?.created_to
    }
    const paginate = {
        page: parseInt(query?.page) || 1,
        limit: parseInt(query?.limit) || 10,
        disable_paging: query?.disable_paging === 'true' || query?.disable_paging === true
    }
    const result = await metricRepo.filter(filters, paginate);

    return result;
};