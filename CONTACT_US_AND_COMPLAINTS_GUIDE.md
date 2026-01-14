# Contact Us and Complaints Module Guide

## Overview

This guide covers two modules:
1. **Contact Us Module** - Admin manages company information and social media URLs
2. **Complaints Module** - Users submit complaints, suggestions, or messages to the company

---

## Contact Us Module

### Purpose
Allows administrators to store and manage company contact information and social media links. Only one contact record is maintained in the system.

### Database Structure

**Table: `contact_us`**
- `id` - UUID primary key
- `companyName` - Company name
- `addressLine1` - First line of address
- `addressLine2` - Second line of address (optional)
- `city` - City
- `state` - State/Province
- `zipCode` - ZIP/Postal code
- `country` - Country
- `phoneNumber` - Phone number
- `emailAddress` - Email address
- `facebookUrl` - Facebook page URL
- `instagramUrl` - Instagram profile URL
- `twitterUrl` - Twitter profile URL
- `linkedinUrl` - LinkedIn company URL
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### API Endpoints

#### 1. Create Contact Information
```
POST /contact-us
```

**Authentication**: Required (Admin)

**Request Body:**
```json
{
  "companyName": "Remember Me Memorials LLC",
  "addressLine1": "2118 Thornridge Cir.",
  "addressLine2": "Suite 100",
  "city": "Syracuse",
  "state": "Connecticut",
  "zipCode": "35624",
  "country": "United States",
  "phoneNumber": "(171) 555-2111",
  "emailAddress": "rememberme@demo.com",
  "facebookUrl": "https://www.facebook.com/rememberme",
  "instagramUrl": "https://www.instagram.com/rememberme",
  "twitterUrl": "https://www.twitter.com/rememberme",
  "linkedinUrl": "https://www.linkedin.com/company/rememberme"
}
```

**Response:**
```json
{
  "id": "uuid-of-contact-us"
}
```

**Note**: Only one contact record is allowed. If one exists, use the update or upsert endpoint.

---

#### 2. Get Contact Information
```
GET /contact-us
```

**Authentication**: Not required (Public)

**Response:**
```json
{
  "id": "uuid-of-contact-us",
  "companyName": "Remember Me Memorials LLC",
  "addressLine1": "2118 Thornridge Cir.",
  "addressLine2": "Suite 100",
  "city": "Syracuse",
  "state": "Connecticut",
  "zipCode": "35624",
  "country": "United States",
  "phoneNumber": "(171) 555-2111",
  "emailAddress": "rememberme@demo.com",
  "facebookUrl": "https://www.facebook.com/rememberme",
  "instagramUrl": "https://www.instagram.com/rememberme",
  "twitterUrl": "https://www.twitter.com/rememberme",
  "linkedinUrl": "https://www.linkedin.com/company/rememberme",
  "createdAt": "2025-08-28T12:34:56Z",
  "updatedAt": "2025-08-28T12:34:56Z"
}
```

**Note**: Returns `null` if no contact information exists.

---

#### 3. Update Contact Information
```
PATCH /contact-us/:id
```

**Authentication**: Required (Admin)

**Request Body:** (Same as create, all fields optional)

**Response:**
```json
{
  "id": "uuid-of-contact-us"
}
```

---

#### 4. Upsert Contact Information (Recommended)
```
POST /contact-us/upsert
```

**Authentication**: Required (Admin)

**Request Body:** (Same as create)

**Response:**
```json
{
  "id": "uuid-of-contact-us"
}
```

**Note**: This endpoint creates the record if it doesn't exist, or updates it if it does. This is the recommended way to manage contact information.

---

## Complaints Module

### Purpose
Allows users to submit complaints, suggestions, or general messages to the company. Users can be authenticated or anonymous.

### Database Structure

**Table: `complaints`**
- `id` - UUID primary key
- `userName` - Name of the user (required)
- `userEmail` - Email address (required)
- `userPhoneNumber` - Phone number (optional)
- `messageType` - Enum: `'complaint'`, `'suggestion'`, or `'message'` (default: `'message'`)
- `subject` - Subject line (optional)
- `messageContent` - The actual message/complaint/suggestion (required)
- `userId` - User ID if submitted by authenticated user (optional)
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### API Endpoints

#### 1. Submit Complaint/Suggestion/Message
```
POST /complaints
```

**Authentication**: Optional (if authenticated, complaint is linked to user account)

**Request Body:**
```json
{
  "userName": "Perry Wilson",
  "userEmail": "perry.wilson@example.com",
  "userPhoneNumber": "(219) 555-0114",
  "messageType": "message",
  "subject": "Question about memorial services",
  "messageContent": "I would like to know more about your memorial services and pricing options."
}
```

**Response:**
```json
{
  "id": "uuid-of-complaint"
}
```

**Message Types:**
- `"complaint"` - For complaints/issues
- `"suggestion"` - For suggestions/feedback
- `"message"` - For general inquiries (default)

---

#### 2. Get Complaint by ID
```
GET /complaints/readById/:id
```

**Authentication**: Not required (Public)

**Response:**
```json
{
  "id": "uuid-of-complaint",
  "userName": "Perry Wilson",
  "userEmail": "perry.wilson@example.com",
  "userPhoneNumber": "(219) 555-0114",
  "messageType": "message",
  "subject": "Question about memorial services",
  "messageContent": "I would like to know more about your memorial services...",
  "userId": "uuid-of-user",
  "createdAt": "2025-08-28T12:34:56Z",
  "updatedAt": "2025-08-28T12:34:56Z"
}
```

---

#### 3. Get All Complaints
```
GET /complaints
```

**Authentication**: Required (Admin)

**Query Parameters:**
- `type` - Filter by message type (`complaint`, `suggestion`, `message`)
- `email` - Filter by user email

**Examples:**
```
GET /complaints?type=complaint
GET /complaints?email=perry.wilson@example.com
GET /complaints (returns all)
```

**Response:**
```json
[
  {
    "id": "uuid-of-complaint",
    "userName": "Perry Wilson",
    "userEmail": "perry.wilson@example.com",
    ...
  }
]
```

---

#### 4. Get My Complaints (Current User)
```
GET /complaints/my-complaints
```

**Authentication**: Required

**Response:** Array of complaints submitted by the authenticated user

---

## Usage Examples

### Example 1: Admin Sets Contact Information
```bash
POST /contact-us/upsert
{
  "companyName": "Remember Me Memorials LLC",
  "addressLine1": "2118 Thornridge Cir.",
  "city": "Syracuse",
  "state": "Connecticut",
  "zipCode": "35624",
  "phoneNumber": "(171) 555-2111",
  "emailAddress": "rememberme@demo.com",
  "facebookUrl": "https://www.facebook.com/rememberme",
  "instagramUrl": "https://www.instagram.com/rememberme",
  "twitterUrl": "https://www.twitter.com/rememberme",
  "linkedinUrl": "https://www.linkedin.com/company/rememberme"
}
```

### Example 2: User Submits a Complaint
```bash
POST /complaints
{
  "userName": "Perry Wilson",
  "userEmail": "perry.wilson@example.com",
  "userPhoneNumber": "(219) 555-0114",
  "messageType": "complaint",
  "subject": "Issue with memorial page",
  "messageContent": "I encountered an issue when trying to view a memorial page..."
}
```

### Example 3: User Submits a Suggestion
```bash
POST /complaints
{
  "userName": "Jane Doe",
  "userEmail": "jane.doe@example.com",
  "messageType": "suggestion",
  "subject": "Feature suggestion",
  "messageContent": "It would be great if you could add a feature to..."
}
```

### Example 4: Get Contact Information (Public)
```bash
GET /contact-us
```

### Example 5: Admin Views All Complaints
```bash
GET /complaints
```

### Example 6: Admin Filters Complaints by Type
```bash
GET /complaints?type=complaint
```

---

## Features

### Contact Us Module
- **Single Record**: Only one contact record is maintained
- **Upsert Support**: Easy update-or-create functionality
- **Public Access**: Contact information is publicly accessible
- **Social Media Links**: Support for Facebook, Instagram, Twitter, and LinkedIn

### Complaints Module
- **Multiple Types**: Supports complaints, suggestions, and general messages
- **Optional Authentication**: Users can submit anonymously or while logged in
- **User Linking**: If authenticated, complaints are linked to user accounts
- **Filtering**: Admin can filter by type or email
- **User History**: Authenticated users can view their own submissions

---

## Notes

1. **Contact Us**: The system maintains only one contact record. Use the `upsert` endpoint for the easiest management.

2. **Complaints**: 
   - All fields except `userPhoneNumber`, `subject`, and `messageType` are required
   - `messageType` defaults to `"message"` if not provided
   - If a user is authenticated, their `userId` is automatically linked

3. **Authentication**: 
   - Contact Us endpoints (except GET) require admin authentication
   - Complaint submission is public (authentication optional)
   - Complaint viewing endpoints may require authentication depending on the endpoint
