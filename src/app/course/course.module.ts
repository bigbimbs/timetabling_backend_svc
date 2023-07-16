import { Module } from '@nestjs/common';
import { EncryptHelper, ErrorHelper } from 'src/core/helpers';
import { DatabaseModule } from 'src/modules/database/connections/database.module';
import { courseProvider } from 'src/modules/database/providers';
import { UserModule } from 'src/app/user/user.module';
import { FacultyModule } from '../faculty/faculty.module';
import { CourseRepository } from './course.repository';
import { CourseService } from './course.service';
import { LecturerModule } from '../lecturer/lecturer.module';
import { DepartmentModule } from '../department/department.module';
import { CourseController } from './course.controller';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    FacultyModule,
    LecturerModule,
    DepartmentModule,
  ],
  providers: [
    courseProvider,
    CourseRepository,
    ErrorHelper,
    EncryptHelper,
    CourseService,
  ],
  controllers: [CourseController],
})
export class CourseModule {}
