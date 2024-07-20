import { BadRequestException } from '@nestjs/common';

import { removeImage } from 'src/utils/remove-image.util';

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
  idUser?: string;
  name: string;
  cpf: string;
  birthday: Date;
  cep: string;
  estado: string;
  numero?: string;
  complemento?: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  phone: string;
  email: string;
  password: string;
  status: string;
  profilePicture: ProfilePictureExtracted;
  profileType: string;

  static validateDto(newUser: UserDto) {
    const validateEmail = (email: string) => {
      const re: RegExp = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    const requiredProps = [
      'name',
      'cpf',
      'birthday',
      'cep',
      'estado',
      'cidade',
      'bairro',
      'logradouro',
      'phone',
      'email',
      'password',
    ];

    if (
      !newUser.name ||
      !newUser.cpf ||
      !newUser.birthday ||
      !newUser.cep ||
      !newUser.estado ||
      !newUser.cidade ||
      !newUser.bairro ||
      !newUser.logradouro ||
      !newUser.phone ||
      !newUser.email ||
      !newUser.password
    ) {
      removeImage(newUser.profilePicture.path);
      throw new BadRequestException([
        'Required data: ' + requiredProps.join(', '),
      ]);
    }

    if (!validateEmail(newUser.email)) {
      removeImage(newUser.profilePicture.path);
      throw new BadRequestException(['E-mail inválido']);
    }

    if (newUser.cep.length < 8) {
      removeImage(newUser.profilePicture.path);
      throw new BadRequestException(['O CEP deve conter 8 dígitos']);
    }
  }
}
