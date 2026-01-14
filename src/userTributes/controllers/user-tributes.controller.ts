import { Body, Controller, Param } from '@nestjs/common';
import { UserTributeService } from '../services/user-tributes.service';
import {
    CreateResourceCombinedDecorators,
    DeleteResourceCombinedDecorators,
    PatchResourceCombinedDecorators,
    ReadResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { CreateUserTributeModel } from '../models/create-user-tributes-model';
import { CreateUserTributeRequestDto } from '../dtos/request/create-user-tributes-request.dto';
import { UpdateUserTributeRequestDto } from '../dtos/request/update-user-tributes-request.dto';
import { UpdateUserTributeModel } from '../models/update-user-tributes-model';
import { CreateUserTributesResponseDto } from '../dtos/response/create-user-tributes-response.dto';
import { UpdateUserTributesResponseDto } from '../dtos/response/update-user-tributes-response.dto';
import { ReadUserTributeResponseDto } from '../dtos/response/read-user-tributes-response.dto';

@Controller('user-tributes')
export class UserTributeController {
    constructor(private readonly userTributeService: UserTributeService) { }

    /** ✅ Create Tribute */
    @CreateResourceCombinedDecorators({
        responseType: CreateUserTributeRequestDto,
        additionalErrors: ['badRequest', 'conflict'],
    })
    async createTribute(
        @Body() dto: CreateUserTributeRequestDto,
    ): Promise<CreateUserTributesResponseDto> {
        const model = CreateUserTributeModel.fromDto(dto);
        const tribute = await this.userTributeService.createTribute(model);
        return CreateUserTributesResponseDto.fromModel(tribute);
    }

    /** ✅ Update Tribute */
    @PatchResourceCombinedDecorators({
        path: ':id',
        responseType: UpdateUserTributesResponseDto,
        additionalErrors: ['notFound', 'badRequest'],
    })
    async updateTribute(
        @Param('id') id: string,
        @Body() dto: UpdateUserTributeRequestDto,
    ): Promise<{ id: string }> {
        const model = UpdateUserTributeModel.fromDto(dto, id);
        return await this.userTributeService.updateTribute(model);
    }

    /** ✅ Get Tribute by ID */
    @ReadResourceCombinedDecorators({
        path: '/readById/:id',
        responseType: ReadUserTributeResponseDto,
        additionalErrors: ['notFound'],
    })
    async getTributeById(@Param('id') id: string): Promise<ReadUserTributeResponseDto> {
        const tribute = await this.userTributeService.getTributeById(id);
        return ReadUserTributeResponseDto.fromEntity(tribute);
    }

    /** ✅ Get All Tributes */
    @ReadResourceCombinedDecorators({
        path: '',
        responseType: ReadUserTributeResponseDto,
        additionalErrors: ['notFound'],
    })
    async getAllTributes(): Promise<ReadUserTributeResponseDto[]> {
        const tributeList = await this.userTributeService.getAllTributes();
        return ReadUserTributeResponseDto.fromEntities(tributeList);
    }

    /** ✅ Get Tributes by MemorialId */
    @ReadResourceCombinedDecorators({
        path: 'memorial/:memorialId',
        responseType: ReadUserTributeResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async getTributesByMemorialId(
        @Param('memorialId') memorialId: string,
    ): Promise<ReadUserTributeResponseDto[]> {
        const tributeList = await this.userTributeService.getTributesByMemorialId(memorialId);
        return ReadUserTributeResponseDto.fromEntities(tributeList);
    }

    /** ✅ Get Tributes by UserId */
    @ReadResourceCombinedDecorators({
        path: 'user/:userId',
        responseType: ReadUserTributeResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async getTributesByUserId(
        @Param('userId') userId: string,
    ): Promise<ReadUserTributeResponseDto[]> {
        const tributeList = await this.userTributeService.getTributesByUserId(userId);
        return ReadUserTributeResponseDto.fromEntities(tributeList);
    }

    /** ✅ Delete Tribute */
    @DeleteResourceCombinedDecorators({
        path: ':id',
        responseType: ReadUserTributeResponseDto,
        additionalErrors: ['notFound', 'conflict'],
    })
    async deleteTribute(@Param('id') id: string): Promise<{ id: string }> {
        return await this.userTributeService.deleteTribute(id);
    }
}
