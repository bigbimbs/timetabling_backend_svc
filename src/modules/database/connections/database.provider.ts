import { DataSource } from 'typeorm';
import { DB_PROVIDE_NAME } from '../constants';
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
import { ConfigService } from 'src/core/config/config.service';

export const databaseProviders = [
  {
    provide: DB_PROVIDE_NAME,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        // type: 'mysql',
        // host: 'localhost',
        // port: 3306,
        // username: 'admin',
        // password: 'admin',
        // database: 'timetabling',
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          AvailabilityEntity,
          CourseEntity,
          DepartmentEntity,
          FacultyEntity,
          LecturersEntity,
          LevelEntity,
          TimeEntity,
          UserEntity,
          VenuesEntity,
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
