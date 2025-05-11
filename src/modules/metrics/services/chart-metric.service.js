const metricRepo = require('../../../cores/databases/schemas/metrics/metric.repository');
const { BASE_UNIT, METRIC_TYPE } = require('../../../shared/constants/metric.constant');
const { convertMeterToDistanceUnit, convertCToTemperatureUnit } = require('../../../shared/ultis/converter.util');

exports.getChart = async (query) => {
    const { type, unit, fromDate, toDate } = query

    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
        throw new Error(`fromDate need to smaller than toDate`)
    }

    const result = await metricRepo.getChart({ type, fromDate, toDate });

    //Handle response with unit
    if (result.length) {
        if (unit) {
            result.forEach(e => {
                e.unit = unit
                e.value = type === METRIC_TYPE.DISTANCE
                    ? convertMeterToDistanceUnit(e.value, unit)
                    : convertCToTemperatureUnit(e.value, unit)
            })
        } else {
            result.forEach(e => {
                e.unit = BASE_UNIT[type]
            })
        }
    }

    return result;
};