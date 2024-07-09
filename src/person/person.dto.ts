import { AddressEntity } from 'src/db/entities/address.entity';
import { ContactEntity } from 'src/db/entities/contact.entity';
import { PersonEntity } from 'src/db/entities/person.entity';

export class PersonDto {
  idPerson?: string;
  name: string;
  cpf: string;
  birthday: Date;
  cep: string;
  estado: string;
  numero: string;
  complemento: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  phone: string;

  static destructingPersonDto(
    newPerson: PersonDto,
  ): [
    contact: ContactExtracted,
    address: AddressExtracted,
    person: PersonExtracted,
  ] {
    const contact = {
      phone: newPerson.phone,
    };
    const address = {
      cep: newPerson.cep,
      estado: newPerson.estado,
      numero: newPerson.numero,
      cidade: newPerson.cidade,
      bairro: newPerson.bairro,
      logradouro: newPerson.logradouro,
      complemento: newPerson.complemento,
    };

    const person = {
      name: newPerson.name,
      cpf: newPerson.cpf,
      birthday: newPerson.birthday,
    };

    return [contact, address, person];
  }

  static personStructuring(
    contact: ContactEntity,
    address: AddressEntity,
    person: PersonEntity,
  ): PersonDto {
    return {
      idPerson: person.idPerson,
      name: person.name,
      cpf: person.cpf,
      birthday: person.birthday,
      cep: address.cep,
      estado: address.estado,
      numero: address.numero,
      complemento: address.complemento,
      cidade: address.cidade,
      bairro: address.bairro,
      logradouro: address.logradouro,
      phone: contact.phone,
    };
  }
}

export interface ContactExtracted {
  phone: string;
}

export interface AddressExtracted {
  cep: string;
  estado: string;
  numero: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  complemento: string;
}

export interface PersonExtracted {
  name: string;
  cpf: string;
  birthday: Date;
}
