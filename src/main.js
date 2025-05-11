// main.js
const express = require('express');
const app = express();
const cors = require('cors')

const PORT = process.env.PORT || 3000;
const db = require('./cores/databases/postgresql')
const loggerMiddleware = require('./cores/middlewares/logger.middleware')
//Router
const metricRouter = require('./modules/metrics/metric.router')

const main = async () => {
    // connect postgresql
    await db.connect()

    app.use(express.json());// Middleware to parse JSON
    app.use(cors())
    //Logger
    app.use(loggerMiddleware.requestLogger)
    app.use(loggerMiddleware.responseLogger)

    // Route
    app.use('/metric', metricRouter)

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

main()
