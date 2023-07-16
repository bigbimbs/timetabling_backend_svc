import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DepartmentEntity } from './department.entity';

@Entity('level')
export class LevelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint', nullable: false })
  level: number;

  @Column({ type: 'int', nullable: false })
  numOfStudents: number;

  @ManyToOne(() => DepartmentEntity, (department) => department.levels)
  department: DepartmentEntity;
}
