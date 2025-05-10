const yup = require('yup');
const { DISTANCE_UNITS, TEMPERATURE_UNITS, METRIC_TYPE } = require('../../../shared/constants/metric.constant');

const schema = yup.object({
    type: yup.string().oneOf(Object.values(METRIC_TYPE)).required(),
    date: yup.date().optional(),
    value: yup.number().optional(),
    unit: yup.string().when('type', {
        is: METRIC_TYPE.DISTANCE,
        then: yup.string().oneOf(Object.values(DISTANCE_UNITS)),
        otherwise: yup.string().oneOf(Object.values(TEMPERATURE_UNITS)),
    }),
    created_by: yup.number().optional(),
});

exports.validateCreate = async (body) => {
    try {
        await schema.validate(body);
        return null;
    } catch (err) {
        return err.message;
    }
};