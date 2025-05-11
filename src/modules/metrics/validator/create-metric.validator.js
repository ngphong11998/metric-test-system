const { METRIC_TYPE } = require('../../../shared/constants/metric.constant')

const createMetricDto = {
    type: 'object',
    required: ['type', 'date', 'value'],
    properties: {
        type: { type: 'string', enum: Object.values(METRIC_TYPE) },
        date: { type: 'string', format: 'date-time' }, // 'date' format is also accepted by ajv-formats
        value: { type: 'number' }
    }
};

module.exports = {
    createMetricDto
}