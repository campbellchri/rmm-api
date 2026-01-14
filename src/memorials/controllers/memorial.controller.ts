import { BadRequestException, Body, Controller, Param, Query } from '@nestjs/common';
import { MemorialService } from '../services/memorial.service';
import {
    CreateResourceCombinedDecorators,
    DeleteResourceCombinedDecorators,
    PatchResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { UserIdToken } from 'src/common/decorators/user-id-token.decorator';
import { DecodedIdToken } from 'src/common/interfaces/decoded-id-token.interface';

import { CreateMemorialRequestDto } from '../dtos/request/create-memorial-request.dto';
import { UpdateMemorialRequestDto } from '../dtos/request/update-memorial-request.dto';
import { CreateMemorialResponseDto } from '../dtos/response/create-memorial-response.dto';
import { UpdateMemorialResponseDto } from '../dtos/response/update-memorial-response.dto';
import { ReadMemorialResponseDto } from '../dtos/response/read-memorial-response.dto';

import { CreateMemorialModel } from '../models/create-memorial-model';
import { UpdateMemorialModel } from '../models/update-memorial-model';
import { ReadVideoMemorialModeResponseDto } from '../dtos/response/read-video-memorial-response.dto';
import { ReadEventMemorialModeResponseDto } from '../dtos/response/read-event-memorial-response.dto';
import { ReadFullMemorialResponseDto } from '../dtos/response/read-full-memorial-response.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('memorials')
export class MemorialController {
    constructor(private readonly memorialService: MemorialService) { }

    /** ✅ Create Memorial */
    @ApiBearerAuth()
    @CreateResourceCombinedDecorators({
        responseType: CreateMemorialResponseDto,
        additionalErrors: ['badRequest', 'conflict'],
    })
    async createMemorial(
        @Body() dto: CreateMemorialRequestDto,
        @UserIdToken() userIdToken: DecodedIdToken,
    ): Promise<CreateMemorialResponseDto> {
        // Set creatorId from authenticated user
        dto.creatorId = userIdToken.uid;
        
        // Set userId for all userMedia items from authenticated user
        if (dto.userMedia?.length) {
            dto.userMedia = dto.userMedia.map(media => ({
                ...media,
                userId: media.userId || userIdToken.uid,
            }));
        }
        
        // Set userId for all userTributes items from authenticated user
        if (dto.userTributes?.length) {
            dto.userTributes = dto.userTributes.map(tribute => ({
                ...tribute,
                userId: tribute.userId || userIdToken.uid,
            }));
        }
        
        const model = CreateMemorialModel.fromDto(dto);
        const memorial = await this.memorialService.createMemorial(model);
        return CreateMemorialResponseDto.fromModel(memorial);
    }

    /** ✅ Update Memorial */
    @ApiBearerAuth()
    @PatchResourceCombinedDecorators({
        path: ':id',
        responseType: UpdateMemorialResponseDto,
        additionalErrors: ['notFound', 'badRequest'],
        
    })
    async updateMemorial(
        @Param('id') id: string,
        @Body() dto: UpdateMemorialRequestDto,
    ): Promise<UpdateMemorialResponseDto> {
        const model = UpdateMemorialModel.fromDto(dto, id);
        const memorial = await this.memorialService.updateMemorials(model);
        return UpdateMemorialResponseDto.fromModel(memorial);
    }

    /** ✅ Get Memorial by ID */
    @ApiBearerAuth()
    @ReadResourceCombinedDecorators({
        path: '/readById/:id',
        responseType: ReadMemorialResponseDto,
        additionalErrors: ['notFound'],
    })
    async getMemorialById(
        @Param('id') id: string,
    ): Promise<ReadMemorialResponseDto> {
        const memorial = await this.memorialService.getMemorialById(id);
        return ReadMemorialResponseDto.fromModel(memorial);
    }

    /** ✅ Get All Memorials */
    @ApiBearerAuth()
    @ReadResourceCombinedDecorators({
        path: '',
        responseType: ReadMemorialResponseDto,
        additionalErrors: ['notFound'],
    })
    async getAllMemorials(): Promise<ReadMemorialResponseDto[]> {
        const memorials = await this.memorialService.getAllMemorials();
        return ReadMemorialResponseDto.fromModels(memorials);
    }

    /** ✅ Get Memorials by Creator */
    @ApiBearerAuth()
    @ReadResourceCombinedDecorators({
        path: 'creator/:creatorId/:memorialId',
        additionalErrors: ['notFound'],
    })
    async getMemorialsByCreatorIdAndMode(
        @Param('creatorId') creatorId: string,
        @Param('memorialId') memorialId: string,
        @Query('mode') mode: 'video-mode' | 'full-mode' | 'event-mode',
    ): Promise<any[]> {
        const memorials = await this.memorialService.getMemorialsByCreatorIdAndMode(creatorId, memorialId, mode);

        switch (mode) {
            case 'video-mode':
                return memorials.map(m => ReadVideoMemorialModeResponseDto.fromModel(m));
            case 'full-mode':
                return memorials.map(m => ReadFullMemorialResponseDto.fromModel(m));
            case 'event-mode':
                return memorials.map(m => ReadEventMemorialModeResponseDto.fromModel(m));
            default:
                throw new BadRequestException(`Unsupported mode: ${mode}`);
        }
    }


    /** ✅ Delete Memorial */
    @ApiBearerAuth()
    @DeleteResourceCombinedDecorators({
        path: ':id',
        responseType: ReadMemorialResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async deleteMemorial(@Param('id') id: string): Promise<{ id: string }> {
        return await this.memorialService.deleteMemorial(id);
    }
}
