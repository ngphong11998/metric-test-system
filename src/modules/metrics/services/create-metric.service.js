const metricRepo = require('../../../cores/databases/schemas/metrics/metric.repository');
const { DISTANCE_UNITS, METRIC_TYPE, BASE_UNIT } = require('../../../shared/constants/metric.constant');
const { convertTemperatureToC, convertDistanceToMeter } = require('../../../shared/ultis/converter.util');

exports.create = async (body) => {
    const { type, value, unit } = body;

    //Convert value by unit input to base unit in database
    let baseValue = value;
    if (unit) {
        baseValue = type === METRIC_TYPE.DISTANCE
            ? convertDistanceToMeter(value, unit)
            : convertTemperatureToC(value, unit);
        body.value = baseValue
    }
    const result = await metricRepo.create(body);
    
    return {
        ...result,
        unit: unit || BASE_UNIT[type],
        value: value
    };
};