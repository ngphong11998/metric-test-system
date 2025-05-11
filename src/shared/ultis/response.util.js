const responseSuccess = (res, data) => {
    res.status(200).json({ success: true, data })
};

const responseError = (res, errorMsg, statusCode = 500) => {
    res.errMsg = errorMsg
    res.status(statusCode).json({ success: false, message: errorMsg })
};

module.exports = {
    responseSuccess,
    responseError
}