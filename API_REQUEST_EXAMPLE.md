# Complete Memorial Creation API Request

## Endpoint
```
POST /memorials
```

## Headers
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

## Complete Payload Example

```json
{
  "description": "Celebrating the life of John Doe, a beloved father, husband, and friend who touched many lives.",
  "favSaying": "Celebrating the life of John Doe",
  "landingModeId": "b992c1b6-16c8-400c-9794-698fe079ef84",
  "templateId": "3c63c0c0-c21d-4cbe-ba2e-71e090419e94",
  "personName": "John Doe",
  "personGender": "male",
  "personBirthDate": "1950-05-10",
  "personDeathDate": "2024-07-15",
  "profilePictureId": "profile-photo-id",
  "personProfilePicture": "https://cdn.example.com/photos/john.jpg",
  "favQuote": "To live in hearts we leave behind is not to die.",
  "featuredPhotoId": "featured-photo-id",
  "featuredPhotoURL": "https://cdn.example.com/photos/featured-john.jpg",
  "lifeStoryText": "John was born on May 10, 1950, in a small town. He grew up with a passion for helping others and dedicated his life to his family and community. He worked as a teacher for over 30 years, inspiring countless students. John was known for his kindness, sense of humor, and unwavering support for his loved ones. He will be deeply missed by all who knew him.",
  "lifeStoryImageId": "life-story-image-id",
  "lifeStoryImageURL": "https://cdn.example.com/photos/life-story.jpg",
  "publishStatus": "draft",
  "userMedia": [
    {
      "mimeType": "image/jpeg",
      "fileURL": "https://cdn.example.com/uploads/photo1.jpg",
      "fileId": "uuid-of-file-1",
      "type": "photo",
      "category": "gallery",
      "userId": "LKRao6GluLP1ZYl36TCaFfAatys2",
      "photoCaption": "Family Picture",
      "photoDescription": "John at the beach with his family in 2019",
      "isActive": true,
      "sortOrder": 0
    },
    {
      "mimeType": "video/mp4",
      "fileURL": "https://cdn.example.com/uploads/video1.mp4",
      "fileId": "uuid-of-video-1",
      "type": "video",
      "category": "gallery",
      "userId": "LKRao6GluLP1ZYl36TCaFfAatys2",
      "videoTitle": "John's 70th Birthday Celebration",
      "videoDescription": "A beautiful video montage of John's 70th birthday party",
      "isMainVideo": false,
      "isActive": true,
      "sortOrder": 1
    }
  ],
  "userTributes": [
    {
      "authorName": "Jane Doe",
      "content": "You will always be remembered for your kindness and love.",
      "type": "memory",
      "imageUrl": "https://cdn.example.com/uploads/tribute1.jpg",
      "imageId": "tribute-image-1",
      "userId": "LKRao6GluLP1ZYl36TCaFfAatys2"
    }
  ],
  "favoriteSayings": [
    {
      "content": "You will always be remembered for your kindness and love.",
      "authorName": "Jane Doe"
    },
    {
      "content": "In loving memory of a life well lived.",
      "authorName": "Family"
    }
  ]
}
```

## Field Descriptions

### Required Fields
- `landingModeId` - UUID of the landing mode (full-mode, event-mode, video-only-mode)
- `templateId` - UUID of the template to use
- **Note:** `creatorId` is automatically extracted from the JWT token - you don't need to include it

### Optional Fields

#### Basic Information
- `description` - Memorial description
- `favSaying` - Legacy favorite saying (kept for backward compatibility)

#### Person Details
- `personName` - Full name of the deceased
- `personGender` - Gender: "male", "female", "other", "prefer_not_to_say"
- `personBirthDate` - Birth date (ISO format: "YYYY-MM-DD")
- `personDeathDate` - Death date (ISO format: "YYYY-MM-DD")
- `profilePictureId` - ID of the profile picture
- `personProfilePicture` - URL of the profile picture
- `favQuote` - Main quote

#### Featured Content
- `featuredPhotoId` - ID of the featured photo
- `featuredPhotoURL` - URL of the featured photo

#### Life Story
- `lifeStoryText` - Full life story text
- `lifeStoryImageId` - ID of the life story image
- `lifeStoryImageURL` - URL of the life story image

#### Publishing
- `publishStatus` - Status: "draft", "standard", "private", "archived" (default: "draft")

#### Media (userMedia array)
Each media item can have:
- `mimeType` - MIME type (e.g., "image/jpeg", "video/mp4")
- `fileURL` - URL of the file
- `fileId` - ID of the file
- `type` - Media type: "photo", "video", "audio", "document"
- `category` - Category: "profile", "featured", "gallery", "life_story_image"
- `userId` - ID of the user who uploaded
- `photoCaption` - Caption for photos
- `photoDescription` - Description for photos
- `videoTitle` - Title for videos
- `videoDescription` - Description for videos
- `isMainVideo` - Boolean for main video (Event/Video mode)
- `isActive` - Boolean for active status
- `sortOrder` - Number for ordering

#### Tributes (userTributes array)
Each tribute can have:
- `authorName` - Name of the author
- `content` - Tribute content
- `type` - Type: "memory", "condolence", "note"
- `imageUrl` - Optional image URL
- `imageId` - Optional image ID
- `userId` - ID of the user who created the tribute

#### Favorite Sayings (favoriteSayings array)
Each saying can have:
- `content` - The saying text (required)
- `authorName` - Optional author name

## Authentication

The `creatorId` is automatically extracted from the JWT token in the `Authorization` header. The token should be in the format:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

The user ID from the token will be used as the `creatorId` for the memorial.

## Example cURL Request

```bash
curl -X POST http://localhost:3000/memorials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d @COMPLETE_MEMORIAL_PAYLOAD_EXAMPLE.json
```

## Example with Postman

1. Set method to `POST`
2. URL: `http://localhost:3000/memorials`
3. Headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer YOUR_JWT_TOKEN_HERE`
4. Body (raw JSON): Use the payload example above
