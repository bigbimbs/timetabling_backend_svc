import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LecturersEntity } from './lecturer.entity';
import { DepartmentEntity } from './department.entity';
import { CourseEntity } from './course.entity';
import { VenuesEntity } from './venue.entity';
import { FacultyEntity } from './faculty.entity';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  name: string;

  @Exclude()
  @Column({ unique: true })
  apiKey: string;

  @Exclude()
  @Column({ unique: true })
  privateApiKey: string;

  @OneToMany(() => LecturersEntity, (lecturer) => lecturer.user, {
    cascade: true,
  })
  lecturers: LecturersEntity[];

  @OneToMany(() => DepartmentEntity, (department) => department.user, {
    cascade: true,
  })
  departments: DepartmentEntity[];

  @OneToMany(() => CourseEntity, (course) => course.user, { cascade: true })
  courses: CourseEntity[];

  @OneToMany(() => VenuesEntity, (venue) => venue.user, { cascade: true })
  venues: VenuesEntity[];

  @OneToMany(() => FacultyEntity, (faculty) => faculty.user, { cascade: true })
  faculties: FacultyEntity[];

  // @CreateDateColumn({
  //   precision: null,
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // createdAt: Date;

  // @UpdateDateColumn({
  //   precision: null,
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // updatedAt: Date;

  // @Exclude()
  // @DeleteDateColumn({
  //   precision: null,
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  // deletedAt: Date;
}
