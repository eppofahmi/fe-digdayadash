# API Contract Specification
## Dashboard Persuratan PBNU Frontend

### Overview
This document defines the API contract between the Vue.js/Nuxt.js frontend and the backend service for the Dashboard Persuratan PBNU system. The API is designed to support real-time monitoring of digital correspondence implementation across PBNU organizational structure.

**Base URL**: `https://api.persuratan-pbnu.com/v1`  
**Authentication**: Bearer Token (JWT)  
**Content-Type**: `application/json`

---

## 1. Dashboard Overview Statistics

### GET `/dashboard/statistics`
Get overview statistics for the main dashboard cards.

#### Request
```http
GET /dashboard/statistics
Authorization: Bearer <token>
```

#### Response
```typescript
interface StatisticsResponse {
  success: boolean
  message: string
  data: {
    totalKepengurusan: {
      value: string
      description: string
      trend?: number // percentage change
    }
    pengurusTerhubung: {
      value: string
      description: string
      connected: number
      total: number
      percentage: number
    }
    suratTerkirim: {
      value: string
      description: string
      trend?: number
    }
    suratMasuk: {
      value: string
      description: string
      trend?: number
    }
    logDisposisi: {
      value: string
      description: string
      trend?: number
    }
    memo: {
      value: string
      description: string
      trend?: number
    }
  }
  timestamp: string
}
```

#### Example Response
```json
{
  "success": true,
  "message": "Statistics retrieved successfully",
  "data": {
    "totalKepengurusan": {
      "value": "10,621",
      "description": "pengurus terhubung",
      "trend": 5.2
    },
    "pengurusTerhubung": {
      "value": "152/184",
      "description": "50%",
      "connected": 152,
      "total": 184,
      "percentage": 82.6
    },
    "suratTerkirim": {
      "value": "12,450",
      "description": "surat terkirim",
      "trend": 12.3
    },
    "suratMasuk": {
      "value": "9,156",
      "description": "surat masuk",
      "trend": -2.1
    },
    "logDisposisi": {
      "value": "8,245",
      "description": "log disposisi",
      "trend": 8.7
    },
    "memo": {
      "value": "3,245",
      "description": "memo",
      "trend": 15.6
    }
  },
  "timestamp": "2025-09-01T10:30:00Z"
}
```

---

## 2. Organization Activation Data

### GET `/dashboard/activation`
Get account activation data by organization with ranking and filtering.

#### Request
```http
GET /dashboard/activation?page=1&limit=10&kepengurusan=&wilayah=&cabang=&lembaga=&tingkat=&status=
Authorization: Bearer <token>
```

#### Query Parameters
| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
| page | number | Page number | No | 1 |
| limit | number | Records per page | No | 10 |
| kepengurusan | string | Organization name search | No | - |
| wilayah | string | Region filter (Pusat/Wilayah/Cabang) | No | - |
| cabang | string | Branch/province code | No | - |
| lembaga | string | Institution category (Pengurus/Lembaga) | No | - |
| tingkat | string | Organizational level | No | - |
| status | string | Activation status (Baik/Sedang/Buruk) | No | - |

#### Response
```typescript
interface ActivationResponse {
  success: boolean
  message: string
  data: OrganizationActivation[]
  meta: {
    current_page: number
    per_page: number
    total: number
    total_pages: number
  }
}

interface OrganizationActivation {
  ranking: number
  nama: string
  tingkat: string
  kepengurusan: string
  aktivasi: string // "47/50" format
  status: 'Baik' | 'Sedang' | 'Buruk'
  percentage: number
  connectedUsers: number
  totalUsers: number
  lastActivity?: string
  implementationDate?: string
}
```

#### Example Response
```json
{
  "success": true,
  "message": "Activation data retrieved successfully",
  "data": [
    {
      "ranking": 1,
      "nama": "PBNU",
      "tingkat": "Pusat",
      "kepengurusan": "Pengurus",
      "aktivasi": "47/50",
      "status": "Baik",
      "percentage": 94,
      "connectedUsers": 47,
      "totalUsers": 50,
      "lastActivity": "2025-09-01T08:30:00Z",
      "implementationDate": "2025-06-30"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 184,
    "total_pages": 19
  }
}
```

---

## 3. Organization Statistics

### GET `/dashboard/organization-statistics`
Get letter management statistics per organization.

#### Request
```http
GET /dashboard/organization-statistics?page=1&limit=10&kepengurusan=&wilayah=&cabang=&lembaga=&tingkat=
Authorization: Bearer <token>
```

#### Query Parameters
Same as activation endpoint (without status filter).

#### Response
```typescript
interface OrganizationStatsResponse {
  success: boolean
  message: string
  data: OrganizationStatistics[]
  meta: PaginationMeta
}

interface OrganizationStatistics {
  no: number
  nama: string
  tingkat: string
  kepengurusan: string
  tanggalMulai: string
  suratKeluar: number
  suratMasuk: number
  logDisposisi: number
  memo: number
  efficiency?: number // calculated efficiency score
}
```

#### Example Response
```json
{
  "success": true,
  "message": "Organization statistics retrieved successfully",
  "data": [
    {
      "no": 1,
      "nama": "PBNU",
      "tingkat": "Pusat",
      "kepengurusan": "Pengurus",
      "tanggalMulai": "2025-06-30",
      "suratKeluar": 1400,
      "suratMasuk": 1220,
      "logDisposisi": 1365,
      "memo": 1310,
      "efficiency": 95.2
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 184,
    "total_pages": 19
  }
}
```

---

## 4. Trend Analysis

### GET `/dashboard/trends`
Get time-series data for letter volume trends.

#### Request
```http
GET /dashboard/trends?timeRange=daily&dateFrom=2025-06-20&dateTo=2025-06-30&managementId=
Authorization: Bearer <token>
```

#### Query Parameters
| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
| timeRange | string | Time aggregation (daily/weekly/monthly) | No | daily |
| dateFrom | string | Start date (YYYY-MM-DD) | No | last 30 days |
| dateTo | string | End date (YYYY-MM-DD) | No | today |
| managementId | number | Filter by organization ID | No | all |

#### Response
```typescript
interface TrendResponse {
  success: boolean
  message: string
  data: {
    labels: string[]
    data: number[]
    statistics: {
      total: number
      average: number
      highest: number
      lowest: number
      trend: number // percentage change
    }
    timeRange: string
    period: {
      from: string
      to: string
    }
  }
}
```

#### Example Response
```json
{
  "success": true,
  "message": "Trend data retrieved successfully",
  "data": {
    "labels": ["20 Jun", "21 Jun", "22 Jun", "23 Jun", "24 Jun", "25 Jun"],
    "data": [150, 200, 180, 220, 250, 300],
    "statistics": {
      "total": 1300,
      "average": 216.7,
      "highest": 300,
      "lowest": 150,
      "trend": 15.8
    },
    "timeRange": "daily",
    "period": {
      "from": "2025-06-20",
      "to": "2025-06-25"
    }
  }
}
```

---

## 5. Filter Options

### GET `/dashboard/filters`
Get available filter options for dropdowns and search.

#### Request
```http
GET /dashboard/filters
Authorization: Bearer <token>
```

#### Response
```typescript
interface FilterOptionsResponse {
  success: boolean
  message: string
  data: {
    kepengurusan: Array<{
      value: string
      label: string
      count: number
    }>
    wilayah: Array<{
      value: string
      label: string
      count: number
    }>
    cabang: Array<{
      value: string
      label: string
      provinceCode?: string
      regencyCode?: string
      count: number
    }>
    lembaga: Array<{
      value: string
      label: string
      count: number
    }>
    tingkat: Array<{
      value: string
      label: string
      count: number
    }>
    status: Array<{
      value: string
      label: string
      description: string
      count: number
    }>
  }
}
```

---

## 6. Data Export

### POST `/dashboard/export`
Export dashboard data in various formats.

#### Request
```http
POST /dashboard/export
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "activation", // "activation" | "statistics" | "trends"
  "format": "csv", // "csv" | "excel" | "pdf"
  "filters": {
    "kepengurusan": "",
    "wilayah": "",
    "dateFrom": "2025-06-01",
    "dateTo": "2025-08-31"
  },
  "includeCharts": true // for PDF export
}
```

#### Response
```typescript
interface ExportResponse {
  success: boolean
  message: string
  data: {
    downloadUrl: string
    filename: string
    expiresAt: string
    fileSize: number
  }
}
```

---

## 7. Search and Autocomplete

### GET `/dashboard/search`
Search organizations and get autocomplete suggestions.

#### Request
```http
GET /dashboard/search?q=pbnu&type=organization&limit=5
Authorization: Bearer <token>
```

#### Response
```typescript
interface SearchResponse {
  success: boolean
  message: string
  data: Array<{
    id: number
    name: string
    type: string
    level: string
    category: string
    matchType: 'exact' | 'partial' | 'fuzzy'
    relevanceScore: number
  }>
}
```

---

## Error Handling

### Standard Error Response
```typescript
interface ErrorResponse {
  success: false
  message: string
  errors?: Array<{
    field?: string
    code: string
    message: string
  }>
  timestamp: string
}
```

### HTTP Status Codes
- `200 OK` - Successful request
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation errors
- `500 Internal Server Error` - Server error

---

## Rate Limiting
- **Rate Limit**: 100 requests per minute per API key
- **Headers**:
  - `X-RateLimit-Limit`: Request limit per window
  - `X-RateLimit-Remaining`: Remaining requests in current window
  - `X-RateLimit-Reset`: Timestamp when window resets

---

## Authentication

### Bearer Token Format
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Payload
```typescript
interface TokenPayload {
  sub: string // user ID
  iat: number // issued at
  exp: number // expires at
  permissions: string[]
  managementId?: number // optional: restrict to specific organization
}
```

---

## WebSocket Real-Time Updates (Optional)

### Connection
```typescript
const ws = new WebSocket('wss://api.persuratan-pbnu.com/ws/dashboard');
ws.send(JSON.stringify({
  type: 'subscribe',
  channels: ['statistics', 'activation', 'trends'],
  token: 'Bearer <token>'
}));
```

### Message Format
```typescript
interface WSMessage {
  type: 'update' | 'error' | 'ping'
  channel: string
  data: any
  timestamp: string
}
```

---

## Implementation Notes

### Database Queries
The API endpoints map directly to PostgreSQL queries defined in the parent documentation:
- Statistics use aggregate functions with proper filtering
- Activation data uses ranking with window functions  
- Trends use time-series aggregation with `date_trunc()`
- All queries include proper pagination and filtering

### Performance Considerations
- Use Redis caching for statistics (5-minute TTL)
- Implement database connection pooling
- Add indexes on frequently queried fields
- Use materialized views for complex aggregations

### Security Requirements
- JWT token validation on all endpoints
- Input validation and SQL injection prevention
- Rate limiting per user/organization
- Audit logging for all data access

This API contract provides a complete specification for building the backend service that will power the Vue.js/Nuxt.js dashboard frontend.