import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { DepartmentEntity } from './department.entity';
import { UserEntity } from './user.entity';

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
}
