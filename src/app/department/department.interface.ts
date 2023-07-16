import { FacultyEntity, UserEntity } from 'src/modules/database/entities';

export class ICreateDepartment {
  departmentName: string;
  code: string;
  levels: {
    level: number;
    numOfStudents: number;
  }[];
  faculty: FacultyEntity;
  user: UserEntity;
}

export class IEditDepartment {
  id: string;
  departmentName?: string;
  code?: string;
  levels?: {
    level: number;
    numOfStudents: number;
  }[];
  faculty?: FacultyEntity;
}
