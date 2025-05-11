const { METRIC_TYPE, DISTANCE_UNITS, TEMPERATURE_UNITS } = require('../../../shared/constants/metric.constant')

const getChartDto = {
    type: 'object',
    required: ['type'],
    properties: {
        type: { type: 'string', enum: Object.values(METRIC_TYPE) },
        fromDate: { type: 'string', format: 'date-time' }, // 'date' format is also accepted by ajv-formats
        toDate: { type: 'string', format: 'date-time' },
        unit: { type: 'string' } // placeholder, actual logic below
    },
    if: {
        properties: { type: { const: METRIC_TYPE.DISTANCE } }
    },
    then: {
        properties: {
            unit: { type: 'string', enum: Object.values(DISTANCE_UNITS) }
        }
    },
    else: {
        if: {
            properties: { type: { const: METRIC_TYPE.TEMPERATURE } }
        },
        then: {
            properties: {
                unit: { type: 'string', enum: Object.values(TEMPERATURE_UNITS) }
            }
        }
    },
};

module.exports = {
    getChartDto
}