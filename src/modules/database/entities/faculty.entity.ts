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
import { DepartmentEntity } from './department.entity';
import { UserEntity } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity('faculty')
export class FacultyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  facultyName: string;

  @OneToMany(() => DepartmentEntity, (department) => department.faculty, {
    cascade: true,
  })
  departments: DepartmentEntity[];

  @ManyToOne(() => UserEntity, (user) => user.faculties)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}
