const metricRepo = require('../../../cores/databases/schemas/metrics/metric.repository');
const { BASE_UNIT, DISTANCE_UNIT_LIST, METRIC_TYPE } = require('../../../shared/constants/metric.constant');
const { convertMeterToDistanceUnit, convertCToTemperatureUnit } = require('../../../shared/ultis/converter.util');

exports.getList = async (query) => {
    const { unit } = query
    //Handle filter, paginate
    const filters = {
        type: query?.type,
        created_from: query?.created_from,
        created_to: query?.created_to
    }
    const paginate = {
        page: parseInt(query?.page) || 1,
        limit: parseInt(query?.limit) || 10,
        disable_paging: query?.disable_paging === 'true' || query?.disable_paging === true
    }
    //Query db
    const result = await metricRepo.filter(filters, paginate);
    //Handle response by unit
    if (unit && result?.items?.length) {
        //convertUnit is Distance
        if (DISTANCE_UNIT_LIST.includes(unit)) {
            result.items.forEach(e => {
                if (e.type === METRIC_TYPE.DISTANCE) {
                    e.unit = unit
                    e.value = convertMeterToDistanceUnit(e.value, unit)
                } else {
                    e.unit = BASE_UNIT[METRIC_TYPE.TEMPERATURE]
                }
            })
        } 
        //convertUnit is Temperature
        else {
            result.items.forEach(e => {
                if (e.type === METRIC_TYPE.TEMPERATURE) {
                    e.unit = unit
                    e.value = convertCToTemperatureUnit(e.value, unit)
                } else {
                    e.unit = BASE_UNIT[METRIC_TYPE.DISTANCE]
                }
            })
        }
    } else {
        //Add unit to response
        result.items.forEach(e => e.unit = BASE_UNIT[e.type])
    }

    return result;
};