import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectEntity } from './object.entity';

@Entity({ name: 'tag' })
export class TagEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_tag' })
  idTag?: string;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => ObjectEntity, (obj) => obj.tags)
  @JoinTable()
  objects: ObjectEntity[];
}
