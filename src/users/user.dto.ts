import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum UserStatusEnum {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

export class UserDto {
  @ApiProperty({
    description:
      'O idUser é um campo UUID utilizado como identificador único do user na base de dados. Chave primária',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsOptional()
  idUser: string;

  @ApiProperty({
    description: 'O username é o nome de usuário',
    example: 'matheus martins',
  })
  @IsString()
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
  @IsUUID()
  @IsEnum(UserStatusEnum)
  @IsOptional()
  status: string;

  @ApiProperty({
    description:
      'O idProfile é um campo UUID que serve como identificador do perfil na base de dados. Chave estrangeira',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  idProfile: string;

  @ApiProperty({
    description:
      'O idProfilePicture é um campo UUID que serve como identificador do perfilPicture na base de dados. Chave estrangeira',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  idProfilePicture: string;
}

export class UserRouteParameters {
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  username: string;
}
