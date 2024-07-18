import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInstance,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum UserStatusEnum {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

export enum ProfileTypeEnum {
  ALUNO = 'ALUNO',
  PROFESSOR = 'PROFESSOR',
  ADMINISTRADOR = 'ADMINISTRADOR',
}

export interface UserExtracted {
  email: string;
  password: string;
}

export interface ProfileExtracted {
  type: string;
}

export class ProfilePictureExtracted {
  name: string;
  path: string;
}

export class UserDto {
  @IsUUID()
  @IsOptional()
  idUser?: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsDateString()
  birthday: Date;

  @IsString()
  @Length(8, 8)
  cep: string;

  @IsString()
  estado: string;

  @IsString()
  @IsOptional()
  numero: string;

  @IsString()
  @IsOptional()
  complemento: string;

  @IsString()
  cidade: string;

  @IsString()
  bairro: string;

  @IsString()
  logradouro: string;

  @IsString()
  phone: string;

  @ApiProperty({
    description: 'E-mail válido do usuário',
    example: 'email@email.com',
  })
  @IsEmail()
  @MinLength(3)
  @MaxLength(256)
  email: string;

  @ApiProperty({
    description: 'O password é a senha do usuário. Espera uma senha forte',
    example: 'Password@2024',
  })
  @IsString()
  @MaxLength(256)
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    enum: UserStatusEnum,
    description: 'O status é responsável por dizer a situação do usuário',
    example: 'ATIVO',
  })
  @IsEnum(UserStatusEnum)
  @IsOptional()
  status: string;

  @IsOptional()
  @IsInstance(ProfilePictureExtracted, {
    message: `profilePicture must be like:  { name: 'profile-name', path: 'picture-path' }`,
  })
  profilePicture: ProfilePictureExtracted;

  @IsEnum(ProfileTypeEnum)
  @IsOptional()
  profileType: string;
}
