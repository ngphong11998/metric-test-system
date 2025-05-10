const metricRepo = require('../../../cores/databases/schemas/metrics/metric.repository');

exports.getList = async (query) => {
    return await metricRepo.filter(query);
};