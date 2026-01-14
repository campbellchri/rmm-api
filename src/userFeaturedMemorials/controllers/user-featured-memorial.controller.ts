import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserFeaturedMemorialService } from '../services/user-featured-memorial.service';
import {
    CreateResourceCombinedDecorators,
    DeleteResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { UserIdToken } from 'src/common/decorators/user-id-token.decorator';
import { DecodedIdToken } from 'src/common/interfaces/decoded-id-token.interface';
import { FeatureMemorialRequestDto } from '../dtos/request/feature-memorial-request.dto';
import { FeatureMemorialResponseDto } from '../dtos/response/feature-memorial-response.dto';
import { ReadUserFeaturedMemorialResponseDto } from '../dtos/response/read-user-featured-memorial-response.dto';
import { FeatureMemorialModel } from '../models/feature-memorial-model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user-featured-memorials')
export class UserFeaturedMemorialController {
    constructor(private readonly userFeaturedMemorialService: UserFeaturedMemorialService) {}

    /** ✅ Feature Memorial */
    @ApiOperation({ summary: 'Feature a memorial' })
    @ApiResponse({ status: 201, type: FeatureMemorialResponseDto })
    @CreateResourceCombinedDecorators({
        responseType: FeatureMemorialResponseDto,
        additionalErrors: ['badRequest', 'conflict'],
    })
    async featureMemorial(
        @Body() dto: FeatureMemorialRequestDto,
        @UserIdToken() userIdToken: DecodedIdToken,
    ): Promise<FeatureMemorialResponseDto> {
        const model = FeatureMemorialModel.fromDto(dto, userIdToken.uid);
        const featured = await this.userFeaturedMemorialService.featureMemorial(model);
        return FeatureMemorialResponseDto.fromModel(featured);
    }

    /** ✅ Unfeature Memorial */
    @ApiOperation({ summary: 'Unfeature a memorial' })
    @ApiResponse({ status: 200, description: 'Memorial unfeatured successfully' })
    @DeleteResourceCombinedDecorators({
        path: ':memorialId',
        responseType: FeatureMemorialResponseDto,
        additionalErrors: ['notFound'],
    })
    async unfeatureMemorial(
        @Param('memorialId') memorialId: string,
        @UserIdToken() userIdToken: DecodedIdToken,
    ): Promise<{ id: string }> {
        return await this.userFeaturedMemorialService.unfeatureMemorial(userIdToken.uid, memorialId);
    }

    /** ✅ Get Featured Memorials by User */
    @ApiOperation({ summary: 'Get all featured memorials for a user' })
    @ApiResponse({ status: 200, type: [ReadUserFeaturedMemorialResponseDto] })
    @ReadResourceCombinedDecorators({
        path: 'user/:userId',
        responseType: ReadUserFeaturedMemorialResponseDto,
    })
    async getFeaturedMemorialsByUser(
        @Param('userId') userId: string,
    ): Promise<ReadUserFeaturedMemorialResponseDto[]> {
        const featuredMemorials = await this.userFeaturedMemorialService.getFeaturedMemorialsByUser(userId);
        return ReadUserFeaturedMemorialResponseDto.fromModels(featuredMemorials);
    }

    /** ✅ Get My Featured Memorials (Current User) */
    @ApiOperation({ summary: 'Get all featured memorials for the current authenticated user' })
    @ApiResponse({ status: 200, type: [ReadUserFeaturedMemorialResponseDto] })
    @ReadResourceCombinedDecorators({
        path: 'my-featured',
        responseType: ReadUserFeaturedMemorialResponseDto,
    })
    async getMyFeaturedMemorials(
        @UserIdToken() userIdToken: DecodedIdToken,
    ): Promise<ReadUserFeaturedMemorialResponseDto[]> {
        const featuredMemorials = await this.userFeaturedMemorialService.getFeaturedMemorialsByUser(userIdToken.uid);
        return ReadUserFeaturedMemorialResponseDto.fromModels(featuredMemorials);
    }

    /** ✅ Check if Memorial is Featured */

    @ApiOperation({ summary: 'Check if a memorial is featured by the current user' })
    @ApiResponse({ status: 200, schema: { type: 'object', properties: { isFeatured: { type: 'boolean' } } } })
    @ReadResourceCombinedDecorators({
        path: 'check/:memorialId',
    })
    async checkIfFeatured(
        @Param('memorialId') memorialId: string,
        @UserIdToken() userIdToken: DecodedIdToken,
    ): Promise<{ isFeatured: boolean }> {
        const isFeatured = await this.userFeaturedMemorialService.isFeaturedByUser(userIdToken.uid, memorialId);
        return { isFeatured };
    }

    /** ✅ Get Featured Memorial by ID */
    @ApiOperation({ summary: 'Get a featured memorial by ID' })
    @ApiResponse({ status: 200, type: ReadUserFeaturedMemorialResponseDto })
    @ReadResourceCombinedDecorators({
        path: 'readById/:id',
        responseType: ReadUserFeaturedMemorialResponseDto,
        additionalErrors: ['notFound'],
    })
    async getFeaturedMemorialById(
        @Param('id') id: string,
    ): Promise<ReadUserFeaturedMemorialResponseDto> {
        const featured = await this.userFeaturedMemorialService.getById(id);
        return ReadUserFeaturedMemorialResponseDto.fromModel(featured);
    }
}
