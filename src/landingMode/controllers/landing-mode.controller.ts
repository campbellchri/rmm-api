import { Body, Controller, Param, Query } from '@nestjs/common';
import {
    CreateResourceCombinedDecorators,
    DeleteResourceCombinedDecorators,
    PatchResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { ApiParam } from '@nestjs/swagger';
import { LandingModeService } from '../services/landing-mode.service';
import { CreateLandingModeResponseDto } from '../dtos/response/create-landing-mode.response.dto';
import { CreateLandingModeRequestDto } from '../dtos/request/create-landing-mode.request.dto';
import { CreateLandingModeModel } from '../models/create-landing-mode.model';
import { ReadLandingModeResponseDto } from '../dtos/response/read-landing-mode.response.dto';
import { UpdateLandingModeRequestDto } from '../dtos/request/update-landing-mode.request.dto';
import { UpdateLandingModeModel } from '../models/update-landing-mode.model';


@Controller('landing-mode')
export class LandingModeController {
    constructor(private readonly landingModeService: LandingModeService) { }

    @CreateResourceCombinedDecorators({
        additionalErrors: ['badRequest', 'conflict'],
        responseType: CreateLandingModeResponseDto,
    })
    public async create(
        @Body() dto: CreateLandingModeRequestDto,
    ): Promise<CreateLandingModeResponseDto> {
        const model = CreateLandingModeModel.fromDto(dto);
        const landingMode = await this.landingModeService.createLandingMode(model);
        return CreateLandingModeResponseDto.fromModel(landingMode);
    }

    @ReadResourceCombinedDecorators({
        additionalErrors: ['badRequest'],
        responseType: ReadLandingModeResponseDto,
        public: true,
    })
    public async readAll(
    ): Promise<ReadLandingModeResponseDto[]> {
        const records = await this.landingModeService.getAllLandingModes();
        return ReadLandingModeResponseDto.fromEntities(records);
    }

    @ReadResourceCombinedDecorators({
        path: 'readById/:id',
        additionalErrors: ['badRequest', 'notFound'],
    })
    @ApiParam({ name: 'id', type: String, required: true })
    public async readById(
        @Param('id') id: string,
    ): Promise<ReadLandingModeResponseDto> {
        const landingMode = await this.landingModeService.getLandingModeById(id);
        return ReadLandingModeResponseDto.fromEntity(landingMode);
    }

    @PatchResourceCombinedDecorators({
        path: '/:id',
        additionalErrors: ['badRequest', 'notFound'],
        responseType: CreateLandingModeResponseDto,
    })
    @ApiParam({ name: 'id', type: String, required: true })
    async update(
        @Body() dto: UpdateLandingModeRequestDto,
        @Param('id') id: string,
    ): Promise<CreateLandingModeResponseDto> {
        const model = UpdateLandingModeModel.fromDto(dto, id);
        const updatedLandingMode = await this.landingModeService.updateLandingMode(model);
        return CreateLandingModeResponseDto.fromModel(updatedLandingMode);
    }

    @DeleteResourceCombinedDecorators({
        path: '/:id',
        additionalErrors: ['badRequest', 'notFound'],
        responseType: CreateLandingModeResponseDto,
    })
    @ApiParam({ name: 'id', type: String, required: true })
    async delete(
        @Param('id') id: string,
    ): Promise<CreateLandingModeResponseDto> {
        const deletedLandingMode = await this.landingModeService.deleteLandingMode(id);
        return CreateLandingModeResponseDto.fromModel(deletedLandingMode);
    }
}
