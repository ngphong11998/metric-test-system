const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const { responseError } = require('../../shared/ultis/response.util')

module.exports = (schema, type = 'body') => async (req, res, next) => {
    try {
        //validate req.body || req.query || req.params
        const ajv = new Ajv({
            strict: false,
            allowUnionTypes: true,
            removeAdditional: true,
            userDefaults: true,
            coerceTypes: true,
            allErrors: true,
            verbose: true
        })

        addFormats(ajv)

        const valid = ajv.addSchema(schema, 'bodySchema').validate('bodySchema', req[type])

        if (!valid) {
            responseError(res, 'Input data error', 400)
        }
        return next()

    } catch (error) {
        console.error('Error data in catch: ' + error?.message || JSON.stringify(error))
        responseError(res, 'Input data error', 400)
    }
}