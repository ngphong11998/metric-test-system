const { DISTANCE_UNITS, TEMPERATURE_UNITS } = require('../constants/metric.constant');

// Distance base: meter
const distanceRates = {
    [DISTANCE_UNITS.METER]: 1,
    [DISTANCE_UNITS.CENTIMETER]: 0.01,
    [DISTANCE_UNITS.INCH]: 0.0254,
    [DISTANCE_UNITS.FEET]: 0.3048,
    [DISTANCE_UNITS.YARD]: 0.9144
};

const convertDistanceToMeter = (value, unit) => {
    console.log(`convert`)
    console.log(value, unit)
    if (!distanceRates[unit]) throw new Error(`Unsupported distance unit: ${unit}`);
    return value * distanceRates[unit];
};

const convertMeterToDistanceUnit = (value, unit) => {
    if (!distanceRates[unit]) throw new Error(`Unsupported distance unit: ${unit}`);
    return value / distanceRates[unit];
};

// Temperature base: °C
const convertTemperatureToC = (value, unit) => {
    switch (unit) {
        case TEMPERATURE_UNITS.C: return value;
        case TEMPERATURE_UNITS.F: return (value - 32) * 5 / 9;
        case TEMPERATURE_UNITS.K: return value - 273.15;
        default: throw new Error(`Unsupported temperature unit: ${unit}`);
    }
};

const convertCToTemperatureUnit = (value, unit) => {
    switch (unit) {
        case TEMPERATURE_UNITS.C: return value;
        case TEMPERATURE_UNITS.F: return (value * 9 / 5) + 32;
        case TEMPERATURE_UNITS.K: return value + 273.15;
        default: throw new Error(`Unsupported temperature unit: ${unit}`);
    }
};

module.exports = {
    convertDistanceToMeter,
    convertMeterToDistanceUnit,
    convertTemperatureToC,
    convertCToTemperatureUnit
};
