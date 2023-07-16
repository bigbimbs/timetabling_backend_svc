import { Module } from '@nestjs/common';
import { VenueModule } from './app/venue/venue.module';
import { LecturerModule } from './app/lecturer/lecturer.module';
import { FacultyModule } from './app/faculty/faculty.module';
import { DepartmentModule } from './app/department/department.module';
import { CourseModule } from './app/course/course.module';
import { SeedModule } from './app/user/seed/seed.module';

@Module({
  imports: [
    SeedModule,
    VenueModule,
    LecturerModule,
    FacultyModule,
    DepartmentModule,
    CourseModule,
  ],
})
export class AppModule {}
