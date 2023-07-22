import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AvailabilityEntity } from './availability.entity';
import { Exclude } from 'class-transformer';

@Entity('time')
export class TimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, type: 'varchar', nullable: false })
  startTime: string;

  @Column({ length: 100, type: 'varchar', nullable: false })
  endTime: string;

  @ManyToOne(() => AvailabilityEntity, (availability) => availability.time)
  availability: AvailabilityEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}
