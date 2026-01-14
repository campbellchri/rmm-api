# Memorial Creation Payload Examples

This document provides complete payload examples for all three memorial types supported by the API.

## Common Headers
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
```

**Note:** `creatorId` and `userId` (in userMedia/userTributes) are automatically set from the JWT token - you don't need to include them.

---

## 1. Full Memorial Mode

Complete memorial with all details including life story, photos, videos, sayings, and tributes.

### Endpoint
```
POST /memorials
```

### Payload
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
      "photoCaption": "Family Picture",
      "photoDescription": "John at the beach with his family in 2019",
      "isActive": true,
      "sortOrder": 0
    },
    {
      "mimeType": "image/jpeg",
      "fileURL": "https://cdn.example.com/uploads/photo2.jpg",
      "fileId": "uuid-of-file-2",
      "type": "photo",
      "category": "featured",
      "photoCaption": "Featured Photo",
      "photoDescription": "John's favorite photo from his retirement party",
      "isActive": true,
      "sortOrder": 1
    },
    {
      "mimeType": "video/mp4",
      "fileURL": "https://cdn.example.com/uploads/video1.mp4",
      "fileId": "uuid-of-video-1",
      "type": "video",
      "category": "gallery",
      "videoTitle": "John's 70th Birthday Celebration",
      "videoDescription": "A beautiful video montage of John's 70th birthday party with family and friends",
      "isMainVideo": false,
      "isActive": true,
      "sortOrder": 2
    }
  ],
  "userTributes": [
    {
      "authorName": "Jane Doe",
      "content": "You will always be remembered for your kindness and love. You were the best husband and father anyone could ask for.",
      "type": "memory",
      "imageUrl": "https://cdn.example.com/uploads/tribute1.jpg",
      "imageId": "tribute-image-1"
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

### Key Fields for Full Memorial Mode:
- ✅ All person details (name, gender, birth/death dates, profile picture)
- ✅ Featured photo
- ✅ Life story text and image
- ✅ Multiple photos and videos
- ✅ Favorite sayings
- ✅ Tributes
- ❌ Event details (not used)

---

## 2. Video Only Mode

Focused on videos - perfect for funerals or memorial events where visitors should see the same tribute video quickly.

### Endpoint
```
POST /memorials
```

### Payload
```json
{
  "description": "A tribute to John Doe",
  "landingModeId": "video-only-mode-landing-id",
  "templateId": "video-only-template-id",
  "personName": "John Doe",
  "personGender": "male",
  "personBirthDate": "1950-05-10",
  "personDeathDate": "2024-07-15",
  "profilePictureId": "profile-photo-id",
  "personProfilePicture": "https://cdn.example.com/photos/john.jpg",
  "favQuote": "To live in hearts we leave behind is not to die.",
  "publishStatus": "draft",
  "userMedia": [
    {
      "mimeType": "video/mp4",
      "fileURL": "https://cdn.example.com/uploads/featured-video.mp4",
      "fileId": "uuid-of-featured-video",
      "type": "video",
      "category": "featured",
      "videoTitle": "John's Memorial Tribute Video",
      "videoDescription": "A beautiful tribute video celebrating John's life",
      "isMainVideo": true,
      "isActive": true,
      "sortOrder": 0
    },
    {
      "mimeType": "video/mp4",
      "fileURL": "https://cdn.example.com/uploads/video2.mp4",
      "fileId": "uuid-of-video-2",
      "type": "video",
      "category": "gallery",
      "videoTitle": "John's 70th Birthday Celebration",
      "videoDescription": "Celebration video from John's 70th birthday",
      "isMainVideo": false,
      "isActive": true,
      "sortOrder": 1
    }
  ]
}
```

### Key Fields for Video Only Mode:
- ✅ Person details (name, gender, birth/death dates, profile picture)
- ✅ Quote
- ✅ Featured video (set `isMainVideo: true` and `category: "featured"`)
- ✅ Additional videos (optional)
- ❌ Life story (not typically used)
- ❌ Featured photo (not typically used)
- ❌ Event details (not used)
- ❌ Favorite sayings (optional)

---

## 3. Event Mode

Temporary memorial for special dates like anniversaries, birthdays, or gatherings. Automatically reverts to Full Memorial Mode after the event period.

### Endpoint
```
POST /memorials
```

### Payload
```json
{
  "description": "Celebrating John's birthday",
  "landingModeId": "event-mode-landing-id",
  "templateId": "event-mode-template-id",
  "personName": "John Doe",
  "personGender": "male",
  "profilePictureId": "profile-photo-id",
  "personProfilePicture": "https://cdn.example.com/photos/john.jpg",
  "favQuote": "In loving memory of a life well lived.",
  "eventStart": "2025-08-19T16:02:00Z",
  "eventDuration": "48h",
  "autoRevertToFullMode": true,
  "publishStatus": "draft",
  "userMedia": [
    {
      "mimeType": "video/mp4",
      "fileURL": "https://cdn.example.com/uploads/event-video.mp4",
      "fileId": "uuid-of-event-video",
      "type": "video",
      "category": "gallery",
      "videoTitle": "John's Birthday Celebration Video",
      "videoDescription": "A special video for John's birthday celebration",
      "isMainVideo": true,
      "isActive": true,
      "sortOrder": 0
    }
  ]
}
```

### Key Fields for Event Mode:
- ✅ Person details (name, gender, profile picture)
- ✅ Quote
- ✅ **Event start date & time** (`eventStart`)
- ✅ **Event duration** (`eventDuration` - e.g., "48h", "24h", "72h")
- ✅ **Auto revert flag** (`autoRevertToFullMode: true`)
- ✅ Main video (set `isMainVideo: true`)
- ❌ Birth/death dates (optional for events)
- ❌ Life story (not used)
- ❌ Featured photo (not used)
- ❌ Favorite sayings (optional)

---

## Field Reference by Memorial Type

| Field | Full Memorial | Video Only | Event Mode |
|-------|---------------|------------|------------|
| `personName` | ✅ Required | ✅ Required | ✅ Required |
| `personGender` | ✅ Optional | ✅ Optional | ✅ Optional |
| `personBirthDate` | ✅ Optional | ✅ Optional | ❌ Not used |
| `personDeathDate` | ✅ Optional | ✅ Optional | ❌ Not used |
| `profilePictureId` | ✅ Optional | ✅ Optional | ✅ Optional |
| `personProfilePicture` | ✅ Optional | ✅ Optional | ✅ Optional |
| `favQuote` | ✅ Optional | ✅ Optional | ✅ Optional |
| `featuredPhotoId` | ✅ Optional | ❌ Not used | ❌ Not used |
| `featuredPhotoURL` | ✅ Optional | ❌ Not used | ❌ Not used |
| `lifeStoryText` | ✅ Optional | ❌ Not used | ❌ Not used |
| `lifeStoryImageId` | ✅ Optional | ❌ Not used | ❌ Not used |
| `lifeStoryImageURL` | ✅ Optional | ❌ Not used | ❌ Not used |
| `eventStart` | ❌ Not used | ❌ Not used | ✅ Required |
| `eventDuration` | ❌ Not used | ❌ Not used | ✅ Required |
| `autoRevertToFullMode` | ❌ Not used | ❌ Not used | ✅ Optional (default: false) |
| `userMedia` | ✅ Optional | ✅ Recommended | ✅ Recommended |
| `userTributes` | ✅ Optional | ❌ Not used | ❌ Not used |
| `favoriteSayings` | ✅ Optional | ❌ Not used | ❌ Not used |

---

## Media Category Guide

When creating `userMedia`, use the `category` field to organize your media:

- `"profile"` - Profile picture (though this is also stored in `personProfilePicture`)
- `"featured"` - Featured/main media item (featured photo or main video)
- `"gallery"` - Regular gallery items (photos/videos)
- `"life_story_image"` - Image specifically for life story section

### Video Only Mode Media:
- Featured video: `category: "featured"`, `isMainVideo: true`
- Additional videos: `category: "gallery"`, `isMainVideo: false`

### Full Memorial Mode Media:
- Featured photo: `category: "featured"`
- Gallery photos: `category: "gallery"`
- Life story image: `category: "life_story_image"`
- Videos: `category: "gallery"`

### Event Mode Media:
- Main video: `category: "gallery"`, `isMainVideo: true`

---

## Notes

1. **Authentication**: All requests require a valid JWT token in the `Authorization` header
2. **Auto-populated fields**: `creatorId` and `userId` (in media/tributes) are automatically set from the token
3. **Validation**: The API validates that the `landingModeId` and `templateId` exist and match
4. **Optional fields**: Most fields are optional, but some are recommended based on the memorial type
5. **Publish Status**: Defaults to `"draft"` if not provided. Options: `"draft"`, `"standard"`, `"private"`, `"archived"`
