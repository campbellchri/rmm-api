import { Controller, Body } from '@nestjs/common';
import { DecodedIdToken } from 'src/common/interfaces/decoded-id-token.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from '../dtos/requests/create-user.request.dto';
import { UserResponseDto } from '../dtos/user.response.dto';
import { CreateUserModel } from '../models/create-user-model'
import { UsersService } from '../services/users.service';
import {
  CreateResourceCombinedDecorators,
  PatchResourceCombinedDecorators,
  ReadResourceCombinedDecorators,
} from '../../common/decorators/routes-decorators.decorator';
import { PinoLogger } from 'nestjs-pino';
import { UpdateUserRequestDto } from '../dtos/requests/update-user.request.dto';
import { UpdateUserModel } from '../models/update-user-model';
import { UpdateUserResponseDto } from '../dtos/responses/user-update-response.dto';
import { UserUpdatePasswordRequestDto } from '../dtos/requests/user-update-password-request.dto';
import { UserPasswordResetResponseDto } from '../dtos/responses/user-password-reset-response.dto';
import { UpdateUserPasswordModel } from '../models/user-update-password.model';
import { UserIdToken } from 'src/common/decorators/user-id-token.decorator';


@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly logger: PinoLogger) { }

  @ApiBearerAuth()
  @CreateResourceCombinedDecorators({ responseType: UserResponseDto })
  public async createUser(
    @Body() dto: CreateUserRequestDto,
    @UserIdToken() userIdToken: DecodedIdToken,

  ): Promise<UserResponseDto> {
    this.logger.info('[UsersController] Creating user start', { id: userIdToken.uid });
    const createUserModel = await CreateUserModel.fromDto(dto, userIdToken?.uid);
    const userModel = await this.usersService.createUser(createUserModel);
    this.logger.info('[UsersController] Creating user end', { id: userIdToken?.uid });
    return UserResponseDto.fromModel(userModel);
  }

  @ApiBearerAuth()
  @PatchResourceCombinedDecorators({
    path: 'update/profile',
    responseType: UpdateUserResponseDto, // response DTO
    additionalErrors: ['notFound', 'badRequest'],
  })
  public async updateUserProfile(
    @Body() dto: UpdateUserRequestDto,
    @UserIdToken() userIdToken: DecodedIdToken,
  ): Promise<UpdateUserResponseDto> {
    const updateModel = await UpdateUserModel.fromDto(dto, userIdToken?.uid);
    const updatedUser = await this.usersService.updateUser(updateModel);
    return UpdateUserResponseDto.fromModel(updatedUser);
  }

  @ApiBearerAuth()
  @ReadResourceCombinedDecorators({
    path: 'currentUser',
    responseType: UserResponseDto,
    additionalErrors: ['notFound'],
  })
  async getCurrentUser(
    @UserIdToken() userIdToken: DecodedIdToken,

  ): Promise<UserResponseDto> {
    console.log(userIdToken, 'userIdToken in controller');
    const user = await this.usersService.findById(userIdToken.uid);
    return UserResponseDto.fromModel(user);
  }


  @ApiBearerAuth()
  @PatchResourceCombinedDecorators({
    path: 'resetUserPassword',
    additionalErrors: ['badRequest', 'conflict'],
  })
  public async resetUserPassword(
    @UserIdToken() userIdToken: DecodedIdToken,
    @Body() dto: UserUpdatePasswordRequestDto,
  ): Promise<UserPasswordResetResponseDto> {
    const model = UpdateUserPasswordModel.fromDto(dto, userIdToken?.uid);
    const response = await this.usersService.resetUserPassword(model);
    console.log(response, ' response in controller');
    return UserPasswordResetResponseDto.fromModel(response);
  }
}
