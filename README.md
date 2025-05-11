
# Metric Tracking System

## I. Technical using:

- **NodeJS**, **Javascript**
- **PostgreSQL**:
  ```env
  DB_USER=postgres
  DB_PASSWORD=
  DB_HOST=localhost
  DB_PORT=5432
  DB_NAME=postgres
  ```
- **Libraries**:
  - [`ajv`](https://github.com/ajv-validator/ajv)
  - [`ajv-formats`](https://github.com/ajv-validator/ajv-formats)

---

## II. Prerequisites

1. Init PostgreSQL database.
2. Create `.env` file based on `.env.example`.
3. Run:

   ```bash
   yarn
   ```

4. Start the project:

   ```bash
   yarn start
   ```

---

## III. Database

### 1. Table `metrics`

| Column      | Type                 | Description                                    |
|-------------|----------------------|------------------------------------------------|
| id          | SERIAL PRIMARY KEY   | Unique ID                                      |
| type        | TEXT                 | enum: `TEMPERATURE` or `DISTANCE`             |
| date        | TIMESTAMPTZ          | Input date                                     |
| value       | REAL                 | Input value (stored in base unit)              |
| created_by  | INTEGER              | FK from `users(id)`                            |
| updated_by  | INTEGER              | FK from `users(id)`                            |
| created_at  | TIMESTAMPTZ          | Auto-created                                   |
| updated_at  | TIMESTAMPTZ          | Auto-updated                                   |

```sql
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
```

---

## IV. API

### 1. Create Metric

####  cURL:
```bash
curl --location 'http://localhost:3000/metric/create' \
--header 'Content-Type: application/json' \
--data '{
  "type": "TEMPERATURE",
  "value": 100,
  "date": "2025-04-03T10:00:00Z",
  "unit": "F"
}'
```

####  Request Body:
```json
{
  "type": "TEMPERATURE",
  "value": 100,
  "date": "2025-04-03T10:00:00Z",
  "unit": "F"
}
```

####  Example Response:
```json
{
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
```

---

### 2. Get List of Metrics by Type

####  cURL:
```bash
curl --location 'http://localhost:3000/metric/list' \
--data ''
```

####  Request Query:
```json
{
  "type": "DISTANCE",
  "unit": "inch"
}
```

Example URL:  
```
http://localhost:3000/metric/list?type=DISTANCE&unit=inch
```

####  Example Response:
```json
{
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
        "value": 39.37,
        "unit": "inch"
      },
      {
        "id": 9,
        "type": "DISTANCE",
        "date": "2025-03-04T10:00:00.000Z",
        "value": 7874,
        "unit": "inch"
      }
    ]
  }
}
```

---

### 3. Get Metric Chart (Latest per Day)

####  cURL:
```bash
curl --location 'http://localhost:3000/metric/chart' \
--data ''
```

####  Request Query:
```json
{
  "type": "TEMPERATURE",
  "fromDate": "2025-03-01T00:00:00.000Z",
  "toDate": "2025-05-01T00:00:00.000Z",
  "unit": "F"
}
```

Example URL:
```
http://localhost:3000/metric/chart?type=TEMPERATURE&fromDate=2025-03-01T00:00:00.000Z&toDate=2025-05-01T00:00:00.000Z&unit=F
```

####  Example Response:
```json
{
  "success": true,
  "data": [
    {
      "date": "2025-04-02T17:00:00.000Z",
      "value": 212,
      "unit": "F"
    },
    {
      "date": "2025-04-01T17:00:00.000Z",
      "value": 100.4,
      "unit": "F"
    },
    {
      "date": "2025-03-31T17:00:00.000Z",
      "value": 100.4,
      "unit": "F"
    }
  ]
}
```

---

### 4. Unit Conversion Rule

- All values in database are stored in **base units**:
  - `DISTANCE` => `meter`
  - `TEMPERATURE` => `C`
- If client passes a `unit` in request:
  - The value will be **converted automatically in response**
  - Conversion supports:
    - Distance: `meter`, `centimeter`, `inch`, `feet`, `yard`
    - Temperature: `C`, `F`, `K`
