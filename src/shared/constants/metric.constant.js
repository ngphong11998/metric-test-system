const METRIC_TYPE = {
    DISTANCE: 'DISTANCE',
    TEMPERATURE: 'TEMPERATURE'
}

const DISTANCE_UNITS = {
    METER: 'meter',//Base distance units
    CENTIMETER: 'centimeter',
    INCH: 'inch',
    FEET: 'feet',
    YARD: 'yard',
};
const DISTANCE_UNIT_LIST = Object.values(DISTANCE_UNITS)

const TEMPERATURE_UNITS = {
    C: 'C',//°C - Base temperature units
    F: 'F',//°F
    K: 'K', //°K
};
const TEMPERATURE_UNIT_LIST = Object.values(TEMPERATURE_UNITS)

const BASE_UNIT = {
    [METRIC_TYPE.DISTANCE]: DISTANCE_UNITS.METER,
    [METRIC_TYPE.TEMPERATURE]: TEMPERATURE_UNITS.C
}

module.exports = {
    METRIC_TYPE,
    DISTANCE_UNITS,
    TEMPERATURE_UNITS,
    BASE_UNIT,
    DISTANCE_UNIT_LIST,
    TEMPERATURE_UNIT_LIST
}