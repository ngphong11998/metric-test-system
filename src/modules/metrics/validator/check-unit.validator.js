const { DISTANCE_UNITS, TEMPERATURE_UNITS } = require('../../../shared/constants/metric.constant')

const unitDto = {
    type: 'object',
    properties: {
        unit: {
            type: 'string',
            oneOf: [
                { enum: Object.values(DISTANCE_UNITS) },  // Valid for DISTANCE
                { enum: Object.values(TEMPERATURE_UNITS) } // Valid for TEMPERATURE
            ]
        },
    }
};

module.exports = {
    unitDto
}