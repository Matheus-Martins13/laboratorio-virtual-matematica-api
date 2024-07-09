// nest imports
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

// typeorm imports
import { InjectRepository } from '@nestjs/typeorm';
import typeOrmMigrationConfig from '../db/typeOrm.migration-config';

// entities import
import { AddressEntity } from 'src/db/entities/address.entity';
import { ContactEntity } from 'src/db/entities/contact.entity';
import { PersonEntity } from 'src/db/entities/person.entity';
import { Repository } from 'typeorm';

// dto imports
import {
  AddressExtracted,
  ContactExtracted,
  PersonDto,
  PersonExtracted,
} from './person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  async create(newPerson: PersonDto): Promise<PersonEntity> {
    // varify data
    await this.validateData(newPerson);

    // extract
    const [contact, address, person] =
      PersonDto.destructingPersonDto(newPerson);

    // save
    const personSaved = await this.transactionSavePerson(
      contact,
      address,
      person,
    );

    return personSaved;
  }

  async findByCpf(cpf: string): Promise<PersonEntity> {
    const personFound = await this.personRepository.findOne({
      where: { cpf },
    });

    if (!personFound) return null;

    return personFound;
  }

  private async validateData(newPerson: PersonDto): Promise<void> {
    const requiredProps = [
      'name',
      'cpf',
      'birthday',
      'cep',
      'estado',
      'numero',
      'cidade',
      'bairro',
      'logradouro',
      'phone',
    ];

    if (requiredProps.some((prop) => !newPerson[prop])) {
      throw new BadRequestException([
        'Required data: ' + requiredProps.join(', '),
      ]);
    }

    const cpfAlreadyRegistered = await this.findByCpf(newPerson.cpf);
    const phoneAlreadyRegistered = await this.findByPhoneNumber(
      newPerson.phone,
    );

    if (cpfAlreadyRegistered) {
      throw new ConflictException([
        `User with cpf '${newPerson.cpf}' already registered`,
      ]);
    }

    if (phoneAlreadyRegistered) {
      throw new ConflictException([
        `User with phone '${newPerson.phone}' already registered`,
      ]);
    }
  }

  private async findByPhoneNumber(phoneNumber: string): Promise<ContactEntity> {
    const contactFound = await this.contactRepository.findOne({
      where: { phone: phoneNumber },
    });

    if (!contactFound) return null;

    return contactFound;
  }

  private async transactionSavePerson(
    contact: ContactExtracted,
    address: AddressExtracted,
    person: PersonExtracted,
  ): Promise<PersonEntity | null> {
    const queryRunner = typeOrmMigrationConfig.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const contactSaved = await this.contactRepository.save(contact);
      const addressSaved = await this.addressRepository.save(address);

      const dbPerson: PersonEntity = {
        name: person.name,
        cpf: person.cpf,
        birthday: person.birthday,
        contact: contactSaved,
        address: addressSaved,
      };

      const personSaved = await this.personRepository.save(dbPerson);
      await queryRunner.commitTransaction();
      return personSaved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
