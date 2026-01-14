import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SubscriptionPackageService } from '../services/subscription-package.service';
import {
    CreateResourceCombinedDecorators,
    DeleteResourceCombinedDecorators,
    PatchResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { CreateSubscriptionPackageRequestDto } from '../dtos/request/create-subscription-package-request.dto';
import { UpdateSubscriptionPackageRequestDto } from '../dtos/request/update-subscription-package-request.dto';
import { CreateSubscriptionPackageResponseDto } from '../dtos/response/create-subscription-package-response.dto';
import { UpdateSubscriptionPackageResponseDto } from '../dtos/response/update-subscription-package-response.dto';
import { ReadSubscriptionPackageResponseDto } from '../dtos/response/read-subscription-package-response.dto';
import { CreateSubscriptionPackageModel } from '../models/create-subscription-package-model';
import { UpdateSubscriptionPackageModel } from '../models/update-subscription-package-model';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('subscription-packages')
export class SubscriptionPackageController {
    constructor(private readonly subscriptionPackageService: SubscriptionPackageService) {}

    @ApiBearerAuth()
    @CreateResourceCombinedDecorators({
        responseType: CreateSubscriptionPackageResponseDto,
        additionalErrors: ['badRequest'],
    })
    async createSubscriptionPackage(
        @Body() dto: CreateSubscriptionPackageRequestDto,
    ): Promise<CreateSubscriptionPackageResponseDto> {
        const model = CreateSubscriptionPackageModel.fromDto(dto);
        const packageEntity = await this.subscriptionPackageService.createSubscriptionPackage(model);
        return CreateSubscriptionPackageResponseDto.fromModel(packageEntity);
    }

    @ApiBearerAuth()
    @ReadResourceCombinedDecorators({
        path: 'readById/:id',
        responseType: ReadSubscriptionPackageResponseDto,
        additionalErrors: ['notFound'],
        public: true,
    })
    async getSubscriptionPackageById(
        @Param('id') id: string,
    ): Promise<ReadSubscriptionPackageResponseDto> {
        const packageEntity = await this.subscriptionPackageService.getSubscriptionPackageById(id);
        return ReadSubscriptionPackageResponseDto.fromModel(packageEntity);
    }


    @ReadResourceCombinedDecorators({
        path: 'getAll',
        responseType: ReadSubscriptionPackageResponseDto,
        additionalErrors: ['notFound'],
        public: true,
    })
    async getAllSubscriptionPackages(
        @Query('includeInactive') includeInactive?: string,
    ): Promise<ReadSubscriptionPackageResponseDto[]> {
        const includeInactiveBool = includeInactive === 'true';
        const packages = await this.subscriptionPackageService.getAllSubscriptionPackages(includeInactiveBool);
        return ReadSubscriptionPackageResponseDto.fromModels(packages);
    }

    /** ✅ Update Subscription Package */

    @ApiBearerAuth()
    @PatchResourceCombinedDecorators({
        path: ':id',
        responseType: UpdateSubscriptionPackageResponseDto,
        additionalErrors: ['notFound', 'badRequest'],
        public: true,
    })
    async updateSubscriptionPackage(
        @Param('id') id: string,
        @Body() dto: UpdateSubscriptionPackageRequestDto,
    ): Promise<UpdateSubscriptionPackageResponseDto> {
        const model = UpdateSubscriptionPackageModel.fromDto(dto, id);
        const packageEntity = await this.subscriptionPackageService.updateSubscriptionPackage(model);
        return UpdateSubscriptionPackageResponseDto.fromModel(packageEntity);
    }


    @ApiBearerAuth()
    @DeleteResourceCombinedDecorators({
        path: ':id',
        responseType: UpdateSubscriptionPackageResponseDto,
        additionalErrors: ['notFound'],
    })
    async deleteSubscriptionPackage(
        @Param('id') id: string,
    ): Promise<UpdateSubscriptionPackageResponseDto> {
        const packageEntity = await this.subscriptionPackageService.deleteSubscriptionPackage(id);
        return UpdateSubscriptionPackageResponseDto.fromModel(packageEntity);
    }
}
