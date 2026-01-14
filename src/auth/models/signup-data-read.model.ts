export class SignUpResponseModel {
  userId: string;
  message: string;
  accessToken?: string;
  refreshToken?: string;
  existing?: boolean;
  otpCode?: number;

  static fromObject(data: SignUpResponseModel): SignUpResponseModel {
    const model = {
      userId: data.userId,
      message: data.message,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      existing: data.existing,
      otpCode: data.otpCode,
    };
    return model;
  }
}


export class SignInResponseModel {
  static fromObject(data: SignInResponseModel): SignInResponseModel {
    const model = {
      userId: data.userId,
      name: data.name,
      surName: data.surName,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      role: data.role,
      authProvider: data.authProvider,
    };
    return model;
  }

  userId: string;
  name?: string;
  surName?: string;
  accessToken?: string;
  refreshToken?: string;
  role?: any;
  authProvider?: string;
}

export class ForgetPasswordResponseModel {
  static fromObject(data: ForgetPasswordResponseModel): ForgetPasswordResponseModel {
    const model = {
      userId: data.userId,
      fullName: data.fullName,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      otpCode: data.otpCode,
    };
    return model;
  }

  userId: string;
  fullName?: string;
  accessToken?: string;
  refreshToken?: string;
  otpCode?: number;
}