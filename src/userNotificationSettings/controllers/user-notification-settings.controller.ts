import { Body, Controller, Param, Query } from '@nestjs/common';
import { UserNotificationSettingsService } from '../services/user-notification-settings.service';
import {
  CreateResourceCombinedDecorators,
  ReadResourceCombinedDecorators,
  PatchResourceCombinedDecorators,
} from 'src/common/decorators/routes-decorators.decorator';
import { CreateUserNotificationSettingRequestDto } from '../dto/request/create-user-notification-settings-request.dto';
import { CreateUserNotificationSettingModel } from '../models/user-notification-settings-create.model';
import { UpdateUserNotificationSettingModel } from '../models/user-notification-settings-update.model';
import { ReadUserNotificationSettingResponseDto } from '../dto/response/read-user-notification-settings-response.dto';
import { UpdateUserNotificationSettingsRequestDto } from '../dto/request/update-user-notification-settings-request.dto';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateUserNotificationSettingsResponseDto } from '../dto/response/create-user-notification-settings-response.dto';

import { UpdateUserNotificationSettingsResponseDto } from '../dto/response/update-user-notification-settings-response.dto';

@Controller('userNotificationSettings')
export class UserNotificationSettingsController {
  constructor(
    private readonly userNotificationSettingsService: UserNotificationSettingsService,
  ) { }

  @CreateResourceCombinedDecorators({
    responseType: ReadUserNotificationSettingResponseDto,
    additionalErrors: ['badRequest'],
  })
  public async create(
    @Body() dto: CreateUserNotificationSettingRequestDto,
  ): Promise<CreateUserNotificationSettingsResponseDto> {
    const model = CreateUserNotificationSettingModel.fromDto(dto);
    const result = await this.userNotificationSettingsService.create(model);
    return CreateUserNotificationSettingsResponseDto.fromModel(result);
  }

  @ReadResourceCombinedDecorators({
    responseType: ReadUserNotificationSettingResponseDto,
    path: 'readById/:id',
    additionalErrors: ['notFound', 'badRequest'],
  })
  @ApiParam({ name: 'id', type: String, required: true })
  public async readById(
    @Param('id') id: string,
  ): Promise<ReadUserNotificationSettingResponseDto> {
    const result = await this.userNotificationSettingsService.readById(id)
    return ReadUserNotificationSettingResponseDto.fromModel(result);
  }

  // @ReadResourceCombinedDecorators({
  //   responseType: PaginationResponseDto,
  //   additionalErrors: ['notFound', 'badRequest'],
  // })

  // public async readAll(
  //   @Query() query: PaginationQueryDto,
  // ): Promise<PaginationResponseDto<ReadUserNotificationSettingResponseDto>> {

  //   const list = await this.userNotificationSettingsService.readAll(query);
  //   const mapped = mapPaginationResponse(
  //     list,
  //     ReadUserNotificationSettingResponseDto.fromModel
  //   );
  //   return mapped;
  // }

  @ReadResourceCombinedDecorators({
    path: 'user/:userId',
    responseType: ReadUserNotificationSettingResponseDto,
    additionalErrors: ['notFound'],
  })
  @ApiParam({ name: 'userId', type: String, required: true })
  public async getByUserId(
    @Param('userId') userId: string,
  ): Promise<ReadUserNotificationSettingResponseDto | null> {
    const result = await this.userNotificationSettingsService.getByUserId(userId);
    return result ? ReadUserNotificationSettingResponseDto.fromModel(result) : null;
  }

  @PatchResourceCombinedDecorators({
    path: 'update/:id',
    responseType: ReadUserNotificationSettingResponseDto,
    additionalErrors: ['badRequest', 'notFound'],
  })
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserNotificationSettingsRequestDto,
  ): Promise<UpdateUserNotificationSettingsResponseDto> {
    const model = UpdateUserNotificationSettingModel.fromDto(dto);
    const result = await this.userNotificationSettingsService.update(id, model);
    return UpdateUserNotificationSettingsResponseDto.fromModel(result);
  }
}

