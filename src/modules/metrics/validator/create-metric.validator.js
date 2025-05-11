const { METRIC_TYPE, DISTANCE_UNITS, TEMPERATURE_UNITS } = require('../../../shared/constants/metric.constant')

const createMetricDto = {
    type: 'object',
    required: ['type', 'date', 'value', 'unit'],
    properties: {
        type: { type: 'string', enum: Object.values(METRIC_TYPE) },
        date: { type: 'string', format: 'date-time' }, // 'date' format is also accepted by ajv-formats
        value: { type: 'number' },
        unit: { type: 'string' }
    },
    allOf: [
        {
            if: {
                properties: { type: { const: METRIC_TYPE.DISTANCE } }
            },
            then: {
                properties: {
                    unit: { enum: Object.values(DISTANCE_UNITS) }
                }
            },
            else: {
                properties: {
                    unit: { enum: Object.values(TEMPERATURE_UNITS) }
                }
            }
        }
    ]
};

module.exports = {
    createMetricDto
}