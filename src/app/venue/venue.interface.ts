import { UserEntity } from 'src/modules/database/entities';

export class ICreateVenue {
  name: string;
  capacity: number;
  availableDaysAndTimes: {
    day: string;
    time: {
      startTime: string;
      endTime: string;
    }[];
  }[];
  user: UserEntity;
}

export class IEditVenue {
  id: string;
  name?: string;
  capacity?: number;
  availableDaysAndTimes?: {
    day?: string;
    time?: {
      startTime?: string;
      endTime?: string;
    }[];
  }[];
}
