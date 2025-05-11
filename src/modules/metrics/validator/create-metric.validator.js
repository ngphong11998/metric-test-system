const { METRIC_TYPE, DISTANCE_UNITS, TEMPERATURE_UNITS } = require('../../../shared/constants/metric.constant')

const createMetricDto = {
    type: 'object',
    required: ['type', 'date', 'value'],
    properties: {
        type: { type: 'string', enum: Object.values(METRIC_TYPE) },
        date: { type: 'string', format: 'date-time' }, // 'date' format is also accepted by ajv-formats
        value: { type: 'number' },
        unit: {
            type: 'string',
            anyOf: [
                { enum: Object.values(DISTANCE_UNITS) },
                { enum: Object.values(TEMPERATURE_UNITS) }
            ]
        }      
    }
};

module.exports = {
    createMetricDto
}