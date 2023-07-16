import { UserEntity } from 'src/modules/database/entities';

export class ICreateFaculty {
  facultyName: string;
  user: UserEntity;
}

export class IEditFaculty {
  facultyName: string;
}
