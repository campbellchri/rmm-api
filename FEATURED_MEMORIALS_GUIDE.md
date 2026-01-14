# Featured Memorials Guide

## Overview

The featured memorials feature allows users to mark memorials as "featured" for easy access. This creates a personal collection of favorite memorials for each user.

## Database Structure

### Table: `user_featured_memorials`
- `id` - UUID primary key
- `userId` - Foreign key to users table
- `memorialId` - Foreign key to memorials table
- `createdAt` - Timestamp when memorial was featured
- `updatedAt` - Timestamp when record was last updated
- **Unique constraint**: A user can only feature a memorial once (combination of `userId` and `memorialId`)

## API Endpoints

### 1. Feature a Memorial
```
POST /user-featured-memorials
```

**Authentication**: Required (JWT token)

**Request Body:**
```json
{
  "memorialId": "uuid-of-memorial"
}
```

**Response:**
```json
{
  "id": "uuid-of-featured-memorial",
  "userId": "uuid-of-user",
  "memorialId": "uuid-of-memorial"
}
```

**Errors:**
- `400 Bad Request` - Memorial is already featured by this user
- `404 Not Found` - Memorial or user not found

---

### 2. Unfeature a Memorial
```
DELETE /user-featured-memorials/:memorialId
```

**Authentication**: Required (JWT token)

**Response:**
```json
{
  "id": "uuid-of-featured-memorial"
}
```

**Errors:**
- `404 Not Found` - Featured memorial not found

---

### 3. Get Featured Memorials for a User
```
GET /user-featured-memorials/user/:userId
```

**Authentication**: Not required (public endpoint)

**Response:**
```json
[
  {
    "id": "uuid-of-featured-memorial",
    "userId": "uuid-of-user",
    "memorialId": "uuid-of-memorial",
    "memorial": {
      "id": "uuid-of-memorial",
      "personName": "John Doe",
      "landingModeType": "full-mode",
      "pageURL": "https://rememberme.com/memorial/john-doe",
      // ... full memorial data
    },
    "createdAt": "2025-08-28T12:34:56Z",
    "updatedAt": "2025-08-28T12:34:56Z"
  }
]
```

---

### 4. Get My Featured Memorials (Current User)
```
GET /user-featured-memorials/my-featured
```

**Authentication**: Required (JWT token)

**Response:** Same as endpoint #3, but automatically uses the authenticated user's ID.

---

### 5. Check if Memorial is Featured
```
GET /user-featured-memorials/check/:memorialId
```

**Authentication**: Required (JWT token)

**Response:**
```json
{
  "isFeatured": true
}
```

---

### 6. Get Featured Memorial by ID
```
GET /user-featured-memorials/readById/:id
```

**Authentication**: Not required (public endpoint)

**Response:** Same format as endpoint #3 (single object, not array)

**Errors:**
- `404 Not Found` - Featured memorial not found

---

## Usage Examples

### Example 1: Feature a Memorial
```bash
curl -X POST https://api.example.com/user-featured-memorials \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "memorialId": "7e5c55be-c3d0-4ab7-8c3d-29ffeb1a06cc"
  }'
```

### Example 2: Get My Featured Memorials
```bash
curl -X GET https://api.example.com/user-featured-memorials/my-featured \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Example 3: Check if Memorial is Featured
```bash
curl -X GET https://api.example.com/user-featured-memorials/check/7e5c55be-c3d0-4ab7-8c3d-29ffeb1a06cc \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Example 4: Unfeature a Memorial
```bash
curl -X DELETE https://api.example.com/user-featured-memorials/7e5c55be-c3d0-4ab7-8c3d-29ffeb1a06cc \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Features

1. **One-time Feature**: A user can only feature a memorial once. Attempting to feature it again will return a `400 Bad Request` error.

2. **Automatic User Detection**: When using authenticated endpoints, the user ID is automatically extracted from the JWT token.

3. **Full Memorial Data**: When fetching featured memorials, the complete memorial data (including relations) is returned.

4. **Cascade Deletion**: If a user or memorial is deleted, all associated featured records are automatically deleted.

5. **Ordered Results**: Featured memorials are returned in descending order by creation date (most recently featured first).

---

## Integration Notes

- All endpoints that require authentication use the `@UserIdToken()` decorator to extract the user ID from the JWT token
- The featured memorials are stored in a separate table to maintain data integrity
- The unique constraint ensures data consistency (no duplicate features)
- Foreign key constraints ensure referential integrity

---

## Error Handling

All endpoints follow standard HTTP status codes:
- `200 OK` - Successful GET request
- `201 Created` - Successful POST request
- `400 Bad Request` - Invalid input or duplicate feature
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error
