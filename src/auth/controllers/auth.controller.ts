import { Body, Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PasswordResetService } from '../services/password-reset.service';
import { CreateResourceCombinedDecorators } from 'src/common/decorators/routes-decorators.decorator';
import { SignInRequestDto } from '../dtos/request/sign-in-request.dto';
import { SignUpRequestDto } from '../dtos/request/sign-up-request.dto';
import { ForgotPasswordRequestDto } from '../dtos/request/forgot-password-request.dto';
import { ResetPasswordWithTokenRequestDto } from '../dtos/request/reset-password-with-token-request.dto';
import { SignInDataCreateModel } from '../models/signin-data-create.model';
import { SignUpDataCreateModel } from '../models/signup-data-create.model';
import { ForgotPasswordModel } from '../models/forgot-password-model';
import { ResetPasswordWithTokenModel } from '../models/reset-password-with-token-model';
import { SignUpResponseDto } from '../dtos/response/sign-up-response.dto';
import { SignInResponseDto } from '../dtos/response/sign-in-response.dto';
import { ForgotPasswordResponseDto } from '../dtos/response/forgot-password-response.dto';
import { ResetPasswordWithTokenResponseDto } from '../dtos/response/reset-password-with-token-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordResetService: PasswordResetService,
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

  @CreateResourceCombinedDecorators({
    path: 'forgot-password',
    additionalErrors: [],
    responseType: ForgotPasswordResponseDto,
    public: true,
  })
  public async forgotPassword(
    @Body() forgotPasswordRequestDto: ForgotPasswordRequestDto,
  ): Promise<ForgotPasswordResponseDto> {
    const model = ForgotPasswordModel.fromDto(forgotPasswordRequestDto);
    const response = await this.passwordResetService.forgotPassword(model);
    return ForgotPasswordResponseDto.fromModel(response.message);
  }

  @CreateResourceCombinedDecorators({
    path: 'reset-password',
    additionalErrors: ['badRequest'],
    responseType: ResetPasswordWithTokenResponseDto,
    public: true,
  })
  public async resetPassword(
    @Body() resetPasswordRequestDto: ResetPasswordWithTokenRequestDto,
  ): Promise<ResetPasswordWithTokenResponseDto> {
    const model = ResetPasswordWithTokenModel.fromDto(resetPasswordRequestDto);
    const response = await this.passwordResetService.resetPassword(model);
    return ResetPasswordWithTokenResponseDto.fromModel(response);
  }
}
