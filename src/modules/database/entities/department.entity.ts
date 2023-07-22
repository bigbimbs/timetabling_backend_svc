import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { LevelEntity } from './level.entity';
import { FacultyEntity } from './faculty.entity';
import { CourseEntity } from './course.entity';
import { UserEntity } from './user.entity';

@Entity('department')
export class DepartmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, type: 'varchar', nullable: false })
  departmentName: string;

  @Column({ length: 50, type: 'varchar', nullable: false })
  code: string;

  @OneToMany(() => LevelEntity, (level) => level.department, { cascade: true })
  levels: LevelEntity[];

  @ManyToOne(() => FacultyEntity, (faculty) => faculty.departments)
  faculty: FacultyEntity;

  @ManyToOne(() => CourseEntity, (course) => course.departments)
  course: CourseEntity;

  @ManyToOne(() => UserEntity, (user) => user.departments)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}
