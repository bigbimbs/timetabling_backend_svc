import { Module, forwardRef } from '@nestjs/common';
import { ErrorHelper } from 'src/core/helpers';
import { DatabaseModule } from 'src/modules/database/connections/database.module';
import { facultyProvider } from 'src/modules/database/providers';
import { UserModule } from 'src/app/user/user.module';
import { FacultyEntity } from 'src/modules/database/entities';
import { FacultyService } from './faculty.service';
import { FacultyRepository } from './faulty.repository';
import { FacultyController } from './faculty.controller';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [DatabaseModule, UserModule, forwardRef(() => DepartmentModule)],
  providers: [
    facultyProvider,
    FacultyRepository,
    FacultyEntity,
    ErrorHelper,
    FacultyService,
  ],
  controllers: [FacultyController],
  exports: [FacultyService],
})
export class FacultyModule {}
