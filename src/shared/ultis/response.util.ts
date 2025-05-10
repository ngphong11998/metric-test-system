// export const responseSuccess = (res, data) => {
//     res.status(200).json({ success: true, data })
// };

// export const responseError = (res, errorMsg, statusCode = 500) => {
//     console.error(errorMsg)
//     res.status(statusCode).json({ success: false, message: errorMsg })
// };

exports.success = (res, data) => res.status(200).json({ success: true, data });
exports.error = (res, message, code = 500) => res.status(code).json({ success: false, message });