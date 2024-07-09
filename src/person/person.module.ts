import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from 'src/db/entities/contact.entity';
import { PersonEntity } from 'src/db/entities/person.entity';
import { AddressEntity } from 'src/db/entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactEntity, PersonEntity, AddressEntity]),
  ],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
