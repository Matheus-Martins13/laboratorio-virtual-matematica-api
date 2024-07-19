import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthResponseDto {
  token: string;
  expiresIn: number;
}

export class AuthBodyDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
