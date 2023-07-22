import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('configuration')
export class ConfigurationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint', nullable: false, default: 8 })
  startTime: number;

  @Column({ type: 'smallint', nullable: false, default: 18 })
  endTime: number;

  @Column({ type: 'smallint', nullable: false, default: 1 })
  lecturer_duration: number;

  @Column({
    type: 'simple-array',
  })
  weekdays: string[];

  @Column({ nullable: false, unique: true })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}
