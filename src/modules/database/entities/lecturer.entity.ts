import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AvailabilityEntity } from './availability.entity';
import { CourseEntity } from './course.entity';
import { UserEntity } from './user.entity';
import { Exclude } from 'class-transformer';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}
