# Subscription Packages Module Guide

## Overview

The Subscription Packages module allows administrators to manage subscription packages for the Remember Me Memorials platform. Each package includes pricing, storage capacity, and a list of features.

## Database Structure

### Table: `subscription_packages`
- `id` - UUID primary key
- `packageName` - Name of the package (e.g., "Essential Tribute", "Premium Legacy", "Eternal Archive")
- `iconId` - Optional identifier for the package icon
- `iconURL` - Optional URL to the package icon
- `price` - Decimal price value (e.g., 5, 15, 25)
- `priceUnit` - Enum: `'month'` or `'year'` (default: `'month'`)
- `storageAmount` - Decimal storage amount (e.g., 5, 15, 30)
- `storageUnit` - Enum: `'GB'` or `'TB'` (default: `'GB'`)
- `features` - Array of strings listing package features
- `isActive` - Boolean to enable/disable package (default: `true`)
- `sortOrder` - Integer for ordering packages (default: `0`)
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

## API Endpoints

### 1. Create Subscription Package
```
POST /subscription-packages
```

**Authentication**: Required (Admin)

**Request Body:**
```json
{
  "packageName": "Eternal Archive",
  "iconId": "people-icon",
  "iconURL": "https://cdn.example.com/icons/peole.png",
  "price": 25,
  "priceUnit": "month",
  "storageAmount": 30,
  "storageUnit": "GB",
  "features": [
    "Complete funeral arrangements",
    "Transportation and logistics",
    "Documentation assistance",
    "Traditional ceremony coordination"
  ],
  "isActive": true,
  "sortOrder": 0
}
```

**Response:**
```json
{
  "id": "uuid-of-package"
}
```

---

### 2. Get Subscription Package by ID
```
GET /subscription-packages/readById/:id
```

**Authentication**: Not required (Public)

**Response:**
```json
{
  "id": "uuid-of-package",
  "packageName": "Essential Tribute",
  "iconId": "heart-icon",
  "iconURL": "https://cdn.example.com/icons/heart.png",
  "price": 5,
  "priceUnit": "month",
  "storageAmount": 5,
  "storageUnit": "GB",
  "features": [
    "Complete funeral arrangements",
    "Transportation and logistics",
    "Documentation assistance",
    "Traditional ceremony coordination"
  ],
  "isActive": true,
  "sortOrder": 0,
  "createdAt": "2025-08-28T12:34:56Z",
  "updatedAt": "2025-08-28T12:34:56Z"
}
```

---

### 3. Get All Subscription Packages
```
GET /subscription-packages
GET /subscription-packages?includeInactive=true
```

**Authentication**: Not required (Public)

**Query Parameters:**
- `includeInactive` (optional) - Set to `true` to include inactive packages (default: `false`)

**Response:**
```json
[
  {
    "id": "uuid-of-package-1",
    "packageName": "Essential Tribute",
    "price": 5,
    "priceUnit": "month",
    "storageAmount": 5,
    "storageUnit": "GB",
    "features": [...],
    "isActive": true,
    "sortOrder": 0,
    "createdAt": "2025-08-28T12:34:56Z",
    "updatedAt": "2025-08-28T12:34:56Z"
  },
  {
    "id": "uuid-of-package-2",
    "packageName": "Premium Legacy",
    "price": 15,
    "priceUnit": "month",
    "storageAmount": 15,
    "storageUnit": "GB",
    "features": [...],
    "isActive": true,
    "sortOrder": 1,
    "createdAt": "2025-08-28T12:34:56Z",
    "updatedAt": "2025-08-28T12:34:56Z"
  },
  {
    "id": "uuid-of-package-3",
    "packageName": "Eternal Archive",
    "price": 25,
    "priceUnit": "month",
    "storageAmount": 30,
    "storageUnit": "GB",
    "features": [...],
    "isActive": true,
    "sortOrder": 2,
    "createdAt": "2025-08-28T12:34:56Z",
    "updatedAt": "2025-08-28T12:34:56Z"
  }
]
```

**Note**: Packages are ordered by `sortOrder` (ascending), then by `createdAt` (descending).

---

### 4. Update Subscription Package
```
PATCH /subscription-packages/:id
```

**Authentication**: Required (Admin)

**Request Body:**
```json
{
  "packageName": "Essential Tribute Updated",
  "price": 6,
  "features": [
    "Complete funeral arrangements",
    "Transportation and logistics",
    "Documentation assistance",
    "Traditional ceremony coordination",
    "Additional feature"
  ]
}
```

**Response:**
```json
{
  "id": "uuid-of-package"
}
```

**Note**: All fields in the request body are optional. Only provided fields will be updated.

---

### 5. Delete Subscription Package
```
DELETE /subscription-packages/:id
```

**Authentication**: Required (Admin)

**Response:**
```json
{
  "id": "uuid-of-package"
}
```

---

## Usage Examples

### Example 1: Create Essential Tribute Package
```bash
POST /subscription-packages
{
  "packageName": "Essential Tribute",
  "iconId": "heart-icon",
  "iconURL": "https://cdn.example.com/icons/heart.png",
  "price": 5,
  "priceUnit": "month",
  "storageAmount": 5,
  "storageUnit": "GB",
  "features": [
    "Complete funeral arrangements",
    "Transportation and logistics",
    "Documentation assistance",
    "Traditional ceremony coordination"
  ],
  "isActive": true,
  "sortOrder": 0
}
```

### Example 2: Create Premium Legacy Package
```bash
POST /subscription-packages
{
  "packageName": "Premium Legacy",
  "iconId": "flame-icon",
  "iconURL": "https://cdn.example.com/icons/flame.png",
  "price": 15,
  "priceUnit": "month",
  "storageAmount": 15,
  "storageUnit": "GB",
  "features": [
    "Complete funeral arrangements",
    "Transportation and logistics",
    "Documentation assistance",
    "Traditional ceremony coordination"
  ],
  "isActive": true,
  "sortOrder": 1
}
```

### Example 3: Create Eternal Archive Package
```bash
POST /subscription-packages
{
  "packageName": "Eternal Archive",
  "iconId": "people-icon",
  "iconURL": "https://cdn.example.com/icons/people.png",
  "price": 25,
  "priceUnit": "month",
  "storageAmount": 30,
  "storageUnit": "GB",
  "features": [
    "Complete funeral arrangements",
    "Transportation and logistics",
    "Documentation assistance",
    "Traditional ceremony coordination"
  ],
  "isActive": true,
  "sortOrder": 2
}
```

### Example 4: Get All Active Packages (Public)
```bash
GET /subscription-packages
```

### Example 5: Get All Packages Including Inactive (Admin)
```bash
GET /subscription-packages?includeInactive=true
```

### Example 6: Update Package Price
```bash
PATCH /subscription-packages/:id
{
  "price": 7
}
```

### Example 7: Deactivate Package
```bash
PATCH /subscription-packages/:id
{
  "isActive": false
}
```

---

## Features

1. **Package Management**: Full CRUD operations for subscription packages
2. **Pricing Flexibility**: Support for monthly and yearly pricing
3. **Storage Options**: Configurable storage amounts in GB or TB
4. **Feature Lists**: Array-based feature storage for flexible package descriptions
5. **Icon Support**: Optional icon identifiers and URLs for visual representation
6. **Sorting**: `sortOrder` field for custom package ordering
7. **Active/Inactive**: Toggle packages on/off without deletion
8. **Public Access**: GET endpoints are public for displaying packages to users
9. **Admin Management**: Only admins can create/update/delete packages

---

## Enums

### Price Units
- `month` - Monthly billing
- `year` - Yearly billing

### Storage Units
- `GB` - Gigabytes
- `TB` - Terabytes

---

## Data Types

- **Price**: Decimal (10, 2) - Supports prices like 5.00, 15.99, 25.50
- **Storage Amount**: Decimal (10, 2) - Supports storage like 5.00, 15.50, 30.00
- **Features**: Text array - PostgreSQL array of strings

---

## Notes

1. **Default Values**:
   - `priceUnit`: `'month'`
   - `storageUnit`: `'GB'`
   - `isActive`: `true`
   - `sortOrder`: `0`

2. **Ordering**: Packages are returned ordered by `sortOrder` (ascending), then by `createdAt` (descending).

3. **Public vs Admin**: 
   - GET endpoints are public (no authentication required)
   - POST, PATCH, DELETE endpoints require admin authentication

4. **Soft Delete**: Use `isActive: false` to hide packages without deleting them. Use the `includeInactive` query parameter to retrieve inactive packages.

5. **Features Array**: The features array can contain any number of strings. All packages shown in the design have the same features, but the system supports different features per package.

---

## Error Handling

- `400 Bad Request` - Invalid input (e.g., negative price, missing required fields)
- `404 Not Found` - Package not found
- `500 Internal Server Error` - Server error

---

## Integration with Frontend

The frontend can:
1. Display all active packages using `GET /subscription-packages`
2. Show package details using `GET /subscription-packages/readById/:id`
3. Format prices as `$5/Month` or `$60/Year` based on `price` and `priceUnit`
4. Display storage as `5GB` or `30GB` based on `storageAmount` and `storageUnit`
5. Render features as a bulleted list from the `features` array
6. Display icons using `iconURL` or `iconId`
