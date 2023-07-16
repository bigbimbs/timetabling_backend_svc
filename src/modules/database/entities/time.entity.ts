import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AvailabilityEntity } from './availability.entity';

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
}
