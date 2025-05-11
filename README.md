I. Technical using:
- NodeJS, Javascript
- Postgresql:
    DB_USER=postgres
    DB_PASSWORD=
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=postgres
- Library for validate dto input: ``ajv``, ``ajv-formats``

II. Prequirement:
- Step 1: Init database
- Step 2: Create ``.env`` base on file ``.env.example``
- Step 3: Run ``yarn`` for install package which neccessary
- Step 4: Run ``yarn start``

III. Database
1. Table ``metrics``:
- id: number (Primary key)
- type: string (enum: ``TEMPERATURE`` and ``DISTANCE``)
- date: timestamp with timzone (user input)
- value: real (user input)
- created_by
- updated_by
- created_at
- updated_at 

``
CREATE TABLE IF NOT EXISTS metrics (
            id SERIAL PRIMARY KEY,
            type TEXT NOT NULL DEFAULT 'DISTANCE',
            date TIMESTAMPTZ DEFAULT NOW(),
            value REAL,
            created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
            updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
``

IV. API:
1. User should be able to add new metric with: Date, Value, Unit:
cURL API:

- ``
curl --location 'http://localhost:3000/metric/create' \
--header 'Content-Type: application/json' \
--data '{
    "type": "TEMPERATURE",
    "value": 100,
    "date": "2025-04-03T10:00:00Z",
    "unit":"F"
}'
``

- Request Body: {
    type: enum("TEMPERATURE" | "DISTANCE"), //(required)
    value: number (required)
    date: Date (required)
    unit: enum by type (optional)
        // type === DISTANCE -> enum('meter', 'centimeter', 'inch', 'feet', 'yard')
        // type === TEMPERATURE -> enum('C', 'K', 'F')
}
Example body: {
    "type": "TEMPERATURE",
    "value": 100,
    "date": "2025-04-03T10:00:00Z",
    "unit":"F"
}


- Response: {
    "success": true,
    "data": {
        "id": 26,
        "type": "TEMPERATURE",
        "date": "2025-04-03T10:00:00.000Z",
        "value": 100,
        "created_by": null,
        "updated_by": null,
        "created_at": "2025-05-11T15:02:37.101Z",
        "updated_at": "2025-05-11T15:02:37.101Z",
        "unit": "F"
    }
}

2. User should be able get a List of all Metrics base on the type ( Distance / Temperature):

- ``
curl --location 'http://localhost:3000/metric/list' \
--data ''
``

- Request query: {
    type: enum("TEMPERATURE" | "DISTANCE"), //(required)
}
Example URL: http://localhost:3000/metric/list?type=DISTANCE

- Response: {
    "success": true,
    "data": {
        "pagination": {
            "totalItems": 18,
            "totalPages": 2,
            "pageIndex": 1,
            "itemsPerPage": 10,
            "itemsInPage": 10
        },
        "data": [
            {
                "id": 24,
                "type": "DISTANCE",
                "date": "2025-04-03T10:00:00.000Z",
                "value": 1,
                "created_by": null,
                "updated_by": null,
                "created_at": "2025-05-11T15:02:11.720Z",
                "updated_at": "2025-05-11T15:02:11.720Z",
                "unit": "meter"
            },
            ...,
            {
                "id": 9,
                "type": "DISTANCE",
                "date": "2025-03-04T10:00:00.000Z",
                "value": 200,
                "created_by": null,
                "updated_by": null,
                "created_at": "2025-05-11T14:06:29.965Z",
                "updated_at": "2025-05-11T14:06:29.965Z",
                "unit": "meter"
            }
        ]
    }
}

3. User should be able to get data to draw a chart, which take the latest metric insert for a day, based on the type and specific time period (1 Month, 2 Month)

- ``
curl --location 'http://localhost:3000/metric/chart' \
--data ''
``

- Request query: {
    type: enum("TEMPERATURE" | "DISTANCE"), //(required)
    fromDate: Date (optional)
    toDate: Date (optional)
}
Example URL: http://localhost:3000/metric/chart?type=TEMPERATURE&fromDate=2025-03-01T00%3A00%3A00.000Z&toDate=2025-05-01T00%3A00%3A00.000Z

- Response: {
    "success": true,
    "data": [
        {
            "date": "2025-04-02T17:00:00.000Z",
            "value": 100,
            "unit": "C"
        },
        {
            "date": "2025-04-01T17:00:00.000Z",
            "value": 38,
            "unit": "C"
        },
        {
            "date": "2025-03-31T17:00:00.000Z",
            "value": 38,
            "unit": "C"
        },
        {
            "date": "2025-03-03T17:00:00.000Z",
            "value": 37,
            "unit": "C"
        },
        {
            "date": "2025-02-28T17:00:00.000Z",
            "value": 37,
            "unit": "C"
        }
    ]
}

4. If User specific a unit when calling the above APIs, it should also convert the value for them.
- Add field 'unit' in every API:
    + If API using request.body add to body (API create)
    + If API using request.query add to query (API get list, get chart)
=> response convert value to request unit
*** Note: in database using base unit
- type === DISTANCE: base unit is ``meter``
- type === TEMPERATURE: base unit is ``°C``
