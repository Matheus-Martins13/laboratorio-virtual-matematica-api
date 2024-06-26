import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectEntity } from './object.entity';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_tag' })
  idCategory?: string;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => ObjectEntity, (obj) => obj.categories)
  @JoinTable()
  objects: ObjectEntity[];
}
