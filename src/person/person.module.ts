import { Module } from '@nestjs/common';
import { PersonService } from './person.service';

@Module({
  providers: [PersonService]
})
export class PersonModule {}
