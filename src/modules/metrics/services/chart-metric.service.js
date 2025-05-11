const metricRepo = require('../../../cores/databases/schemas/metrics/metric.repository');

exports.getChart = async (query) => {
    if(query?.fromDate && query?.toDate && new Date(query?.fromDate) > new Date(query?.toDate)){
        throw new Error(`fromDate need to smaller than toDate`)
    }
    const queryInput = {
        type: query.type,
        fromDate: query.fromDate,
        toDate: query.toDate
    };

    return await metricRepo.getChart(queryInput);
};