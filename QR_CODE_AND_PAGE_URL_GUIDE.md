# QR Code and Page URL Guide

## Overview

The memorial system now supports:
1. **Page URL** - Full URL to access the memorial page
2. **QR Code Data** - Store QR code information for sharing memorials

## New Fields Added

### Memorial Entity
- `pageURL` - Full URL to the memorial page (e.g., `https://rememberme.com/memorial/john-doe`)

### QR Code Entity (New Table: `memorial_qr_codes`)
- `memorialId` - Foreign key to memorial
- `qrCodeData` - The data encoded in the QR code (usually the page URL)
- `qrCodeImageURL` - URL to the QR code image file
- `qrCodeImageId` - ID of the QR code image file
- `description` - Optional description

## API Endpoints

### Memorial Endpoints (Updated)

All memorial read endpoints now return:
- `pageURL` - The memorial page URL
- `landingModeType` - Explicit mode type: `'full-mode'`, `'event-mode'`, or `'video-only-mode'`
- `qrCode` - QR code object (if exists)

**Endpoints:**
- `GET /memorials` - Get all memorials (includes `landingModeType` and `pageURL`)
- `GET /memorials/readById/:id` - Get memorial by ID (includes `landingModeType` and `pageURL`)
- `GET /memorials/creator/:creatorId/:memorialId?mode=event-mode` - Get memorials by creator (includes `landingModeType` and `pageURL`)

### QR Code Endpoints (New)

#### 1. Create QR Code
```
POST /memorial-qr-codes
```

**Request Body:**
```json
{
  "memorialId": "uuid-of-memorial",
  "qrCodeData": "https://rememberme.com/memorial/john-doe",
  "qrCodeImageURL": "https://cdn.example.com/qr-codes/qr-code.png",
  "qrCodeImageId": "uuid-of-qr-code-image",
  "description": "QR code for sharing memorial page"
}
```

**Response:**
```json
{
  "id": "uuid-of-qr-code"
}
```

#### 2. Get QR Code by ID
```
GET /memorial-qr-codes/readById/:id
```

**Response:**
```json
{
  "id": "uuid-of-qr-code",
  "memorialId": "uuid-of-memorial",
  "qrCodeData": "https://rememberme.com/memorial/john-doe",
  "qrCodeImageURL": "https://cdn.example.com/qr-codes/qr-code.png",
  "qrCodeImageId": "uuid-of-qr-code-image",
  "description": "QR code for sharing memorial page",
  "createdAt": "2025-08-28T12:34:56Z",
  "updatedAt": "2025-08-28T12:34:56Z"
}
```

#### 3. Get QR Code by Memorial ID
```
GET /memorial-qr-codes/memorial/:memorialId
```

Returns the most recent QR code for the memorial.

#### 4. Update QR Code
```
PATCH /memorial-qr-codes/:id
```

**Request Body:**
```json
{
  "qrCodeData": "https://rememberme.com/memorial/john-doe-updated",
  "qrCodeImageURL": "https://cdn.example.com/qr-codes/qr-code-updated.png",
  "qrCodeImageId": "uuid-of-updated-qr-code-image",
  "description": "Updated QR code"
}
```

#### 5. Delete QR Code
```
DELETE /memorial-qr-codes/:id
```

## Updated Memorial Response

When you call any memorial read endpoint, you'll now get:

```json
{
  "id": "uuid-of-memorial",
  "landingModeType": "full-mode",  // ✅ NEW: Explicit mode type
  "pageURL": "https://rememberme.com/memorial/john-doe",  // ✅ NEW: Page URL
  "landingMode": {
    "id": "uuid-of-landing-mode",
    "title": "Full Memorial Mode",
    "landingModeType": "full-mode",
    ...
  },
  "qrCode": {  // ✅ NEW: QR code data
    "id": "uuid-of-qr-code",
    "memorialId": "uuid-of-memorial",
    "qrCodeData": "https://rememberme.com/memorial/john-doe",
    "qrCodeImageURL": "https://cdn.example.com/qr-codes/qr-code.png",
    ...
  },
  ...
}
```

## Usage Examples

### 1. Create Memorial with Page URL and QR Code (Recommended)
You can now create a QR code automatically when creating a memorial by including `qrCodeData` in the request:

```json
POST /memorials
{
  "landingModeId": "...",
  "templateId": "...",
  "pageURL": "https://rememberme.com/memorial/john-doe",
  "qrCodeData": "https://rememberme.com/memorial/john-doe",  // ✅ QR code will be created automatically
  ...
}
```

The QR code will be created automatically with the provided `qrCodeData`. You can retrieve it later using the memorial read endpoints.

### 2. Create Memorial with Page URL Only
```json
{
  "landingModeId": "...",
  "templateId": "...",
  "pageURL": "https://rememberme.com/memorial/john-doe",
  ...
}
```

### 3. Save QR Code After Memorial Creation (Alternative)
If you didn't include `qrCodeData` during memorial creation, you can create it later:

```json
POST /memorial-qr-codes
{
  "memorialId": "memorial-id-from-create-response",
  "qrCodeData": "https://rememberme.com/memorial/john-doe",
  "qrCodeImageURL": "https://cdn.example.com/qr-codes/qr-code.png",
  "qrCodeImageId": "qr-code-image-id"
}
```

### 3. Get Memorial with Mode Type
```
GET /memorials/readById/7e5c55be-c3d0-4ab7-8c3d-29ffeb1a06cc
```

Response will include:
- `landingModeType: "full-mode"` - You can use this to determine which UI to show
- `pageURL` - The memorial page URL
- `qrCode` - QR code data if exists

## Migration

Run the migration to add the new fields:

```bash
pnpm migration:run
```

This will:
1. Add `pageURL` column to `memorials` table
2. Create `memorial_qr_codes` table

## Notes

- `landingModeType` is automatically included in all memorial responses - no need to use query parameters
- `pageURL` can be set when creating a memorial or updated later
- QR codes are stored separately and can be created/updated independently
- Multiple QR codes can exist for a memorial, but the read endpoint returns the most recent one
