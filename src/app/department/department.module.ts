import { Module } from '@nestjs/common';
import { ErrorHelper } from 'src/core/helpers';
import { DatabaseModule } from 'src/modules/database/connections/database.module';
import {
  departmentProvider,
  levelProvider,
} from 'src/modules/database/providers';
import { UserModule } from 'src/app/user/user.module';
import { FacultyModule } from '../faculty/faculty.module';
import { DepartmentRepository } from './department.repository';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';

@Module({
  imports: [DatabaseModule, UserModule, FacultyModule],
  providers: [
    departmentProvider,
    DepartmentRepository,
    levelProvider,
    ErrorHelper,
    DepartmentService,
  ],
  controllers: [DepartmentController],
  exports: [DepartmentService, DepartmentRepository],
})
export class DepartmentModule {}
