const { DISTANCE_UNITS, TEMPERATURE_UNITS } = require('../constants/metric.constant');


const toMeterFactor = {
    [DISTANCE_UNITS.METER]: 1,
    [DISTANCE_UNITS.CENTIMETER]: 0.01,
    [DISTANCE_UNITS.INCH]: 0.0254,
    [DISTANCE_UNITS.FEET]: 0.3048,
    [DISTANCE_UNITS.YARD]: 0.9144,
};

function convertDistance(value, from, to) {
    return (value * toMeterFactor[from]) / toMeterFactor[to];
}

function convertTemperature(value, from, to) {
    if (from === to) return value;
    if (from === '°C') return to === '°F' ? value * 9 / 5 + 32 : value + 273.15;
    if (from === '°F') return to === '°C' ? (value - 32) * 5 / 9 : (value - 32) * 5 / 9 + 273.15;
    if (from === '°K') return to === '°C' ? value - 273.15 : (value - 273.15) * 9 / 5 + 32;
    throw new Error('Unsupported temperature conversion');
}

module.exports = {
    convertDistance,
    convertTemperature
}