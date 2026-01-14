import { Body, Controller, Param } from '@nestjs/common';
import { UserMediaService } from '../services/user-media.service';
import {
    CreateResourceCombinedDecorators,
    DeleteResourceCombinedDecorators,
    PatchResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { CreateUserMediaResponseDto } from '../dtos/response/create-user-media-response.dto';
import { CreateUserMediaModel } from '../models/create-user-media-model';
import { CreateUserMediaRequestDto } from '../dtos/request/create-user-media-request.dto';
import { UpdateUserMediaResponseDto } from '../dtos/response/update-user-media-response.dto';
import { UpdateUserMediaRequestDto } from '../dtos/request/update-user-media-request.dto';
import { UpdateUserMediaModel } from '../models/update-user-media-model';
import { ReadUserMediaResponseDto } from '../dtos/response/read-user-media-response.dto';


@Controller('user-media')
export class UserMediaController {
    constructor(private readonly userMediaService: UserMediaService) { }

    /** ✅ Create Media */
    @CreateResourceCombinedDecorators({
        responseType: CreateUserMediaResponseDto,
        additionalErrors: ['badRequest', 'conflict'],
    })
    async createMedia(
        @Body() dto: CreateUserMediaRequestDto,
    ): Promise<CreateUserMediaResponseDto> {
        const model = CreateUserMediaModel.fromDto(dto);
        const media = await this.userMediaService.createMedia(model);
        return CreateUserMediaResponseDto.fromModel(media);
    }

    /** ✅ Update Media */
    @PatchResourceCombinedDecorators({
        path: ':id',
        responseType: UpdateUserMediaResponseDto,
        additionalErrors: ['notFound', 'badRequest'],
    })
    async updateMedia(
        @Param('id') id: string,
        @Body() dto: UpdateUserMediaRequestDto,
    ): Promise<{ id: string }> {
        const model = UpdateUserMediaModel.fromDto(dto, id);
        return await this.userMediaService.updateMedia(model);
    }

    /** ✅ Get Media by ID */
    @ReadResourceCombinedDecorators({
        path: '/readById/:id',
        responseType: ReadUserMediaResponseDto,
        additionalErrors: ['notFound'],
    })
    async getMediaById(@Param('id') id: string): Promise<ReadUserMediaResponseDto> {
        const media = await this.userMediaService.getMediaById(id);
        return ReadUserMediaResponseDto.fromEntity(media);
    }

    /** ✅ Get All Media */
    @ReadResourceCombinedDecorators({
        path: '',
        responseType: ReadUserMediaResponseDto,
        additionalErrors: ['notFound'],
    })
    async getAllMedia(): Promise<ReadUserMediaResponseDto[]> {
        const mediaList = await this.userMediaService.getAllMedia();
        return ReadUserMediaResponseDto.fromEntities(mediaList);
    }

    /** ✅ Get Media by MemorialId */
    @ReadResourceCombinedDecorators({
        path: 'memorial/:memorialId',
        responseType: ReadUserMediaResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async getMediaByMemorialId(
        @Param('memorialId') memorialId: string,
    ): Promise<ReadUserMediaResponseDto[]> {
        const mediaList = await this.userMediaService.getMediaByMemorialId(
            memorialId,
        );
        return ReadUserMediaResponseDto.fromEntities(mediaList);
    }

    /** ✅ Get Media by UserId */
    @ReadResourceCombinedDecorators({
        path: 'user/:userId',
        responseType: ReadUserMediaResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async getMediaByUserId(
        @Param('userId') userId: string,
    ): Promise<ReadUserMediaResponseDto[]> {
        const mediaList = await this.userMediaService.getMediaByUserId(userId);
        return ReadUserMediaResponseDto.fromEntities(mediaList);
    }

    /** ✅ Delete Media */
    @DeleteResourceCombinedDecorators({
        path: ':id',
        responseType: ReadUserMediaResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async deleteMedia(@Param('id') id: string): Promise<{ id: string }> {
        return await this.userMediaService.deleteMedia(id);
    }
}
