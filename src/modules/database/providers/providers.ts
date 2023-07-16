import { DataSource } from 'typeorm';

import {
  AvailabilityEntity,
  CourseEntity,
  DepartmentEntity,
  FacultyEntity,
  LecturersEntity,
  LevelEntity,
  TimeEntity,
  UserEntity,
  VenuesEntity,
} from '../entities';
import {
  DB_AVAILABILITY_PROVIDER_REPOSITORY_NAME,
  DB_COURSE_PROVIDER_REPOSITORY_NAME,
  DB_DEPARTMENT_PROVIDER_REPOSITORY_NAME,
  DB_FACULTY_PROVIDER_REPOSITORY_NAME,
  DB_LECTURER_PROVIDER_REPOSITORY_NAME,
  DB_LEVEL_PROVIDER_REPOSITORY_NAME,
  DB_PROVIDE_NAME,
  DB_TIME_PROVIDER_REPOSITORY_NAME,
  DB_USER_PROVIDER_REPOSITORY_NAME,
  DB_VENUE_PROVIDER_REPOSITORY_NAME,
} from '../constants';

export const availabilityProvider = {
  provide: DB_AVAILABILITY_PROVIDER_REPOSITORY_NAME,
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(AvailabilityEntity),
  inject: [DB_PROVIDE_NAME],
};

export const courseProvider = {
  provide: DB_COURSE_PROVIDER_REPOSITORY_NAME,
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(CourseEntity),
  inject: [DB_PROVIDE_NAME],
};

export const departmentProvider = {
  provide: DB_DEPARTMENT_PROVIDER_REPOSITORY_NAME,
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(DepartmentEntity),
  inject: [DB_PROVIDE_NAME],
};

export const venueProvider = {
  provide: DB_VENUE_PROVIDER_REPOSITORY_NAME,
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(VenuesEntity),
  inject: [DB_PROVIDE_NAME],
};

export const facultyProvider = {
  provide: DB_FACULTY_PROVIDER_REPOSITORY_NAME,
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(FacultyEntity),
  inject: [DB_PROVIDE_NAME],
};

export const lecturerProvider = {
  provide: DB_LECTURER_PROVIDER_REPOSITORY_NAME,
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(LecturersEntity),
  inject: [DB_PROVIDE_NAME],
};

export const levelProvider = {
  provide: DB_LEVEL_PROVIDER_REPOSITORY_NAME,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(LevelEntity),
  inject: [DB_PROVIDE_NAME],
};

export const timeProvider = {
  provide: DB_TIME_PROVIDER_REPOSITORY_NAME,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(TimeEntity),
  inject: [DB_PROVIDE_NAME],
};

export const userProvider = {
  provide: DB_USER_PROVIDER_REPOSITORY_NAME,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
  inject: [DB_PROVIDE_NAME],
};
