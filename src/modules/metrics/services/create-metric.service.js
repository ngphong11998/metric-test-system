const metricRepo = require('../../../cores/databases/schemas/metrics/metric.repository');

exports.create = async (payload) => {
    return await metricRepo.create(payload);
};