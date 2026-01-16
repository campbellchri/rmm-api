import { Body, Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateResourceCombinedDecorators } from 'src/common/decorators/routes-decorators.decorator';
import { SignInRequestDto } from '../dtos/request/sign-in-request.dto';
import { SignUpRequestDto } from '../dtos/request/sign-up-request.dto';
import { SignInDataCreateModel } from '../models/signin-data-create.model';
import { SignUpDataCreateModel } from '../models/signup-data-create.model';
import { SignUpResponseDto } from '../dtos/response/sign-up-response.dto';
import { SignInResponseDto } from '../dtos/response/sign-in-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @CreateResourceCombinedDecorators({
    path: 'signUp',
    additionalErrors: ['badRequest', 'conflict'],
    responseType: SignUpResponseDto,
    public: true,
  })
  public async signUp(
    @Body() signUpRequestDto: SignUpRequestDto,
  ): Promise<SignUpResponseDto> {
    const model = SignUpDataCreateModel.fromDto(signUpRequestDto);
    const response = await this.authService.signUp(model);
    return SignUpResponseDto.fromModel(response);
  }

  @CreateResourceCombinedDecorators({
    path: 'signIn',
    additionalErrors: ['badRequest', 'notFound'],
    responseType: SignInResponseDto,
    public: true,
  })
  public async signIn(
    @Body() signInRequestDto: SignInRequestDto,
  ): Promise<SignInResponseDto> {
    const model = SignInDataCreateModel.fromDto(signInRequestDto);
    const response = await this.authService.signIn(model);
    return SignInResponseDto.fromModel(response);
  }
}
