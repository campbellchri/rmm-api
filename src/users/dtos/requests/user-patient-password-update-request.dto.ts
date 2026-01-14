import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPasswordValid } from 'src/common/validators/password.validator';

export class UserPatientUpdatePasswordRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsPasswordValid({ message: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character.' })
    password: string;
}
