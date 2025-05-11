const metricRepo = require('../../../cores/databases/schemas/metrics/metric.repository');

exports.create = async (body) => {
    return await metricRepo.create(body);
};