import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { AvailabilityEntity } from './availability.entity';
import { CourseEntity } from './course.entity';
import { UserEntity } from './user.entity';

@Entity('lecturer')
export class LecturersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, type: 'varchar', nullable: false })
  name: string;

  @Column({ length: 100, type: 'varchar', nullable: false })
  initials: string;

  @OneToMany(
    () => AvailabilityEntity,
    (availability) => availability.lecturerAvailability,
    { cascade: true },
  )
  availableDaysAndTimes: AvailabilityEntity[];

  @ManyToOne(() => CourseEntity, (course) => course.lecturers)
  courses: CourseEntity;

  @ManyToOne(() => UserEntity, (user) => user.lecturers)
  user: UserEntity;
}
