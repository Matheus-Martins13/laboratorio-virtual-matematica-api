import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_address' })
  idAddress?: string;

  @Column({ type: 'varchar' })
  cep: string;

  @Column({ type: 'varchar' })
  estado: string;

  @Column({ type: 'varchar' })
  numero?: string;

  @Column({ type: 'varchar' })
  cidade: string;

  @Column({ type: 'varchar' })
  bairro: string;

  @Column({ type: 'varchar' })
  logradouro: string;

  @Column({ type: 'varchar' })
  complemento?: string;
}
