// middlewares/logger.js
const requestLogger = (req, res, next) => {
    const reqId = Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
    const now = new Date().toISOString();
    console.log(`[REQUEST-${reqId}] [${now}] ${req.method} ${req.originalUrl}`);
    console.log('Req body:', req?.body);
    console.log('Req query: ', req?.query)
    req.reqId = reqId
    next();
};

const responseLogger = (req, res, next) => {
    const startTime = Date.now();

    // Hook vào khi response sắp gửi
    res.on('finish', () => {
        const now = new Date().toISOString();
        const duration = Date.now() - startTime;
        const status = res.statusCode;

        const logBase = `[RESPONSE-${req.reqId}] [${now}] ${req.method} ${req.originalUrl} - statusCode: ${status}(${duration}ms)`;

        if (status >= 200 && status < 300) {
            console.log(`${logBase} SUCCESS`);
        } else if (status >= 400 && status < 600) {
            const errMsg = res.locals?.errorMessage || res.errMsg || 'Unknown error';
            console.error(`${logBase} ERROR: ${errMsg}`);
        }
    });

    next();
  };

module.exports = {
    requestLogger,
    responseLogger
};