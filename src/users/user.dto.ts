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
import { ProfilePictureEntity } from 'src/db/entities/profile-picture.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { PersonDto } from 'src/person/person.dto';

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

  static destructingUserDto(
    newUser: UserDto,
  ): [person: PersonDto, user: UserExtracted, profile: ProfileExtracted] {
    const person = {
      name: newUser.name,
      cpf: newUser.cpf,
      birthday: newUser.birthday,
      cep: newUser.cep,
      estado: newUser.estado,
      numero: newUser.numero,
      complemento: newUser.complemento,
      cidade: newUser.cidade,
      bairro: newUser.bairro,
      logradouro: newUser.logradouro,
      phone: newUser.phone,
    };

    const user = {
      email: newUser.email,
      password: newUser.password,
    };

    const profile = { type: newUser.profileType };

    return [person, user, profile];
  }

  static userStructuring(
    person: PersonDto,
    user: UserEntity,
    profile: ProfileExtracted,
    profilePicture: ProfilePictureEntity,
  ): UserDto {
    return {
      idUser: user.idUser,
      name: person.name,
      cpf: person.cpf,
      birthday: person.birthday,
      cep: person.cep,
      estado: person.estado,
      numero: person.numero,
      complemento: person.complemento,
      cidade: person.cidade,
      bairro: person.bairro,
      logradouro: person.logradouro,
      phone: person.phone,
      email: user.email,
      password: user.passwordHash,
      status: user.status,
      profilePicture: {
        name: profilePicture.name,
        path: profilePicture.path,
      },
      profileType: profile.type,
    };
  }
}
