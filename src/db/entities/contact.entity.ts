import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contact' })
export class ContactEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_contact' })
  idContact?: string;

  @Column({ type: 'varchar' })
  phone: string;
}
