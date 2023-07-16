import { UserEntity } from 'src/modules/database/entities';

export class ICreateLecturer {
  name: string;
  initials: string;
  availableDaysAndTimes: {
    day: string;
    time: {
      startTime: string;
      endTime: string;
    }[];
  }[];
  user: UserEntity;
}

export class IEditLecturer {
  id: string;
  name?: string;
  initials?: string;
  availableDaysAndTimes?: {
    day?: string;
    time?: {
      startTime?: string;
      endTime?: string;
    }[];
  }[];
}
