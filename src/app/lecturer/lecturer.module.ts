import { Module } from '@nestjs/common';
import { ErrorHelper } from 'src/core/helpers';
import { DatabaseModule } from 'src/modules/database/connections/database.module';
import { lecturerProvider } from 'src/modules/database/providers';
import { UserModule } from 'src/app/user/user.module';
import { LecturerRepository } from './lecturer.repository';
import { LecturerService } from './lecturer.service';
import { LecturerController } from './lecturer.controller';
import { AvailabilityModule } from '../availability/availability.module';

@Module({
  imports: [DatabaseModule, UserModule, AvailabilityModule],
  providers: [
    lecturerProvider,
    LecturerRepository,
    ErrorHelper,
    LecturerService,
  ],
  controllers: [LecturerController],
  exports: [LecturerService, LecturerRepository],
})
export class LecturerModule {}
