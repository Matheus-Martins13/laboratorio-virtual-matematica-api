import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { ContactEntity } from './contact.entity';

@Entity({ name: 'person' })
export class PersonEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_person' })
  idPerson?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  cpf: string;

  @Column({ type: 'date' })
  birthday: Date;

  @OneToOne(() => AddressEntity)
  @JoinColumn({ name: 'id_address' })
  address: AddressEntity;

  @OneToOne(() => ContactEntity)
  @JoinColumn({ name: 'id_contact' })
  contact: ContactEntity;
}
