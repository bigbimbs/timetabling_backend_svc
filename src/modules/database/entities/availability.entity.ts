import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeEntity } from './time.entity';
import { VenuesEntity } from './venue.entity';
import { LecturersEntity } from './lecturer.entity';

@Entity('availability')
export class AvailabilityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, type: 'varchar', nullable: false })
  day: string;

  @OneToMany(() => TimeEntity, (time) => time.availability, { cascade: true })
  time: TimeEntity[];

  @ManyToOne(() => VenuesEntity, (venues) => venues.availableDaysAndTimes)
  venueAvailability: VenuesEntity;

  @ManyToOne(
    () => LecturersEntity,
    (lecturers) => lecturers.availableDaysAndTimes,
  )
  lecturerAvailability: LecturersEntity;
}
