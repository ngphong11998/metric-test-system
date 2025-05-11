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

const TEMPERATURE_UNITS = {
    C: 'C',//°C - Base temperature units
    F: 'F',//°F
    K: 'K', //°K
};

module.exports = {
    METRIC_TYPE,
    DISTANCE_UNITS,
    TEMPERATURE_UNITS
}