# Legal Documents Module Guide

## Overview

The Legal Documents module allows administrators to manage Privacy Policy and Terms and Conditions documents. Both document types are stored in a single table with an enum to differentiate between them.

## Database Structure

### Table: `legal_documents`
- `id` - UUID primary key
- `type` - Enum: `'privacy_policy'` or `'terms_and_conditions'` (unique constraint - only one of each type)
- `content` - Long text field for the full document content
- `effectiveDate` - Optional date when the document becomes effective
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

**Unique Constraint**: Only one document of each type can exist (enforced by unique constraint on `type` column)

## API Endpoints

### 1. Create Legal Document
```
POST /legal-documents
```

**Authentication**: Required (Admin)

**Request Body:**
```json
{
  "type": "privacy_policy",
  "content": "This Privacy Policy describes how Remember Me Memorials LLC collects, uses, and protects your personal information...",
  "effectiveDate": "2025-01-01"
}
```

**Response:**
```json
{
  "id": "uuid-of-document"
}
```

**Note**: Only one document of each type is allowed. If a document of the specified type already exists, use the update or upsert endpoint.

**Document Types:**
- `"privacy_policy"` - Privacy Policy document
- `"terms_and_conditions"` - Terms and Conditions document

---

### 2. Get Legal Document by ID
```
GET /legal-documents/readById/:id
```

**Authentication**: Not required (Public)

**Response:**
```json
{
  "id": "uuid-of-document",
  "type": "privacy_policy",
  "content": "This Privacy Policy describes how Remember Me Memorials LLC...",
  "effectiveDate": "2025-01-01T00:00:00Z",
  "createdAt": "2025-08-28T12:34:56Z",
  "updatedAt": "2025-08-28T12:34:56Z"
}
```

---

### 3. Get Legal Document by Type
```
GET /legal-documents/type/:type
```

**Authentication**: Not required (Public)

**Parameters:**
- `type` - Either `privacy_policy` or `terms_and_conditions`

**Response:**
```json
{
  "id": "uuid-of-document",
  "type": "privacy_policy",
  "content": "This Privacy Policy describes how Remember Me Memorials LLC...",
  "effectiveDate": "2025-01-01T00:00:00Z",
  "createdAt": "2025-08-28T12:34:56Z",
  "updatedAt": "2025-08-28T12:34:56Z"
}
```

**Note**: Returns `null` if no document of that type exists.

---

### 4. Get All Legal Documents
```
GET /legal-documents
```

**Authentication**: Not required (Public)

**Response:**
```json
[
  {
    "id": "uuid-of-document-1",
    "type": "privacy_policy",
    "content": "...",
    "effectiveDate": "2025-01-01T00:00:00Z",
    "createdAt": "2025-08-28T12:34:56Z",
    "updatedAt": "2025-08-28T12:34:56Z"
  },
  {
    "id": "uuid-of-document-2",
    "type": "terms_and_conditions",
    "content": "...",
    "effectiveDate": "2025-01-01T00:00:00Z",
    "createdAt": "2025-08-28T12:34:56Z",
    "updatedAt": "2025-08-28T12:34:56Z"
  }
]
```

---

### 5. Update Legal Document
```
PATCH /legal-documents/:id
```

**Authentication**: Required (Admin)

**Request Body:**
```json
{
  "content": "Updated Privacy Policy content...",
  "effectiveDate": "2025-02-01"
}
```

**Response:**
```json
{
  "id": "uuid-of-document"
}
```

**Note**: All fields in the request body are optional. Only provided fields will be updated.

---

### 6. Upsert Legal Document (Recommended)
```
POST /legal-documents/upsert/:type
```

**Authentication**: Required (Admin)

**Parameters:**
- `type` - Either `privacy_policy` or `terms_and_conditions`

**Request Body:**
```json
{
  "type": "privacy_policy",
  "content": "This Privacy Policy describes how Remember Me Memorials LLC...",
  "effectiveDate": "2025-01-01"
}
```

**Response:**
```json
{
  "id": "uuid-of-document"
}
```

**Note**: This endpoint creates the document if it doesn't exist, or updates it if it does. This is the recommended way to manage legal documents.

---

## Usage Examples

### Example 1: Create Privacy Policy
```bash
POST /legal-documents
{
  "type": "privacy_policy",
  "content": "1. Information We Collect\n\nWe collect information that you provide directly to us...\n\n2. How We Use Your Information\n\nWe use the information we collect to...",
  "effectiveDate": "2025-01-01"
}
```

### Example 2: Create Terms and Conditions
```bash
POST /legal-documents
{
  "type": "terms_and_conditions",
  "content": "1. Use of Our Services\n\nBy accessing or using our services, you agree to be bound by these Terms...\n\n2. Ownership and Intellectual Property\n\nAll content on this platform...",
  "effectiveDate": "2025-01-01"
}
```

### Example 3: Get Privacy Policy (Public)
```bash
GET /legal-documents/type/privacy_policy
```

### Example 4: Get Terms and Conditions (Public)
```bash
GET /legal-documents/type/terms_and_conditions
```

### Example 5: Update Privacy Policy
```bash
PATCH /legal-documents/:id
{
  "content": "Updated Privacy Policy content with new sections...",
  "effectiveDate": "2025-02-01"
}
```

### Example 6: Upsert Privacy Policy (Recommended)
```bash
POST /legal-documents/upsert/privacy_policy
{
  "type": "privacy_policy",
  "content": "Updated Privacy Policy content...",
  "effectiveDate": "2025-02-01"
}
```

---

## Features

1. **Single Table Design**: Both Privacy Policy and Terms and Conditions are stored in one table
2. **Type Enum**: Uses enum (`privacy_policy`, `terms_and_conditions`) to differentiate document types
3. **Unique Constraint**: Only one document of each type can exist
4. **Long Text Support**: Content is stored as `text` type to support long documents
5. **Effective Date**: Optional date field to track when documents become effective
6. **Public Access**: Documents can be retrieved publicly (no authentication required for GET endpoints)
7. **Admin Management**: Only admins can create/update documents
8. **Upsert Support**: Easy update-or-create functionality

---

## Content Format

The `content` field accepts plain text. You can include:
- Line breaks (`\n`)
- Numbered sections
- Headings
- Paragraphs

For example:
```
1. Information We Collect

We collect information that you provide directly to us when you create an account, make a purchase, or contact us for support.

2. How We Use Your Information

We use the information we collect to provide, maintain, and improve our services...
```

---

## Notes

1. **Single Document Per Type**: The system enforces that only one Privacy Policy and one Terms and Conditions document can exist at a time.

2. **Content Length**: The `content` field uses PostgreSQL's `text` type, which can store very long documents (up to 1GB).

3. **Effective Date**: The `effectiveDate` field is optional but recommended for tracking when documents become active.

4. **Versioning**: If you need to track document versions, you could extend the system to include a version number or archive old versions.

5. **Public Access**: All GET endpoints are public, allowing frontend applications to display legal documents without authentication.

6. **Admin Only**: Create, update, and upsert endpoints require admin authentication.

---

## Error Handling

- `400 Bad Request` - Invalid input or document type already exists
- `404 Not Found` - Document not found
- `500 Internal Server Error` - Server error
