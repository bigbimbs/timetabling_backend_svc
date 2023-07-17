import {
  DepartmentEntity,
  LecturersEntity,
  UserEntity,
} from 'src/modules/database/entities';

export class ICreateCourse {
  name: string;
  code: string;
  level: number;
  semester: number;
  description?: string;
  percentageAllowedToBeFilled?: number;
  departments: DepartmentEntity[];
  lecturers: LecturersEntity[];
  user: UserEntity;
}

export class IEditCourse {
  id: string;
  name?: string;
  code?: string;
  level?: number;
  semester?: number;
  description?: string;
  percentageAllowedToBeFilled?: number;
  departments: DepartmentEntity[];
  lecturers: LecturersEntity[];
  user?: UserEntity;
}
