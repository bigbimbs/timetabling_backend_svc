import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { DepartmentEntity } from './department.entity';
import { LecturersEntity } from './lecturer.entity';
import { UserEntity } from './user.entity';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, type: 'varchar', nullable: false })
  name: string;

  @Column({ length: 10, type: 'char', nullable: false })
  code: string;

  @Column({ type: 'smallint', nullable: false, default: 1 })
  semester: number;

  @Column({ type: 'smallint', nullable: false })
  level: number;

  @Column({ length: 250, type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'smallint', nullable: true, default: 100 })
  percentageAllowedToBeFilled: number;

  @OneToMany(() => DepartmentEntity, (department) => department.course)
  departments: DepartmentEntity[];

  @OneToMany(() => LecturersEntity, (lecturers) => lecturers.courses)
  lecturers: LecturersEntity[];

  @ManyToOne(() => UserEntity, (user) => user.courses)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}
