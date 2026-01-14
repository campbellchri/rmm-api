import { ApiProperty } from '@nestjs/swagger';
import { UserMediaReadModel } from 'src/userMedia/models/read-user-media-model';


export class ReadUserMediaResponseDto {
    @ApiProperty({ example: 'uuid-of-media' })
    id: string;

    @ApiProperty({ example: 'image/png' })
    mimeType: string;

    @ApiProperty({ example: 'https://cdn.example.com/uploads/media-file.png' })
    fileURL: string;

    @ApiProperty({ example: 'uuid-of-file', required: false })
    fileId?: string;

    @ApiProperty({ example: 'IMAGE', description: 'Media type (e.g., IMAGE, VIDEO, AUDIO)' })
    type: string;

    @ApiProperty({ example: 'uuid-of-memorial' })
    memorialId: string;

    @ApiProperty({ example: 'uuid-of-user' })
    userId: string;

    @ApiProperty({ example: 'Vacation Memories', required: false })
    photoCaption?: string;

    @ApiProperty({ example: 'A beautiful sunset at the beach', required: false })
    photoDescription?: string;

    @ApiProperty({ example: 'Grandma’s 80th Birthday Celebration', required: false })
    videoTitle?: string;

    @ApiProperty({ example: true })
    isMainVideo: boolean;

    @ApiProperty({ example: true })
    isActive: boolean;

    @ApiProperty({ example: 1 })
    sortOrder: number;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-08-28T12:34:56Z' })
    updatedAt: Date;

    static fromEntity(entity: UserMediaReadModel): ReadUserMediaResponseDto {
        const dto = new ReadUserMediaResponseDto();
        dto.id = entity.id;
        dto.mimeType = entity.mimeType;
        dto.fileURL = entity.fileURL;
        dto.fileId = entity.fileId;
        dto.type = entity.type;
        dto.memorialId = entity.memorialId;
        dto.userId = entity.userId;
        dto.photoCaption = entity.photoCaption;
        dto.photoDescription = entity.photoDescription;
        dto.videoTitle = entity.videoTitle;
        dto.isMainVideo = entity.isMainVideo;
        dto.isActive = entity.isActive;
        dto.sortOrder = entity.sortOrder;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }

    static fromSummary(entity: UserMediaReadModel): ReadUserMediaResponseDto {
        const dto = new ReadUserMediaResponseDto();
        dto.id = entity.id;
        dto.userId = entity.userId;
        dto.type = entity.type;
        dto.fileURL = entity.fileURL;
        dto.fileId = entity.fileId;
        dto.photoCaption = entity.photoCaption;
        dto.photoDescription = entity.photoDescription;
        dto.videoTitle = entity.videoTitle;
        dto.isMainVideo = entity.isMainVideo;
        return dto;
    }


    static fromEventMode(entity: UserMediaReadModel): ReadUserMediaResponseDto {
        const dto = new ReadUserMediaResponseDto();
        dto.id = entity.id;
        dto.userId = entity.userId;
        dto.type = entity.type;
        dto.fileURL = entity.fileURL;
        dto.fileId = entity.fileId;
        dto.videoTitle = entity.videoTitle;
        dto.isMainVideo = entity.isMainVideo;
        return dto;
    }

    static fromEntities(entities: UserMediaReadModel[]): ReadUserMediaResponseDto[] {
        return entities.map((entity) => this.fromEntity(entity));
    }
}
