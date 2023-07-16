import { Module } from '@nestjs/common';
import { ErrorHelper } from 'src/core/helpers';
import { DatabaseModule } from 'src/modules/database/connections/database.module';
import { venueProvider } from 'src/modules/database/providers';
import { VenueRepository } from './venue.repository';
import { UserModule } from 'src/app/user/user.module';
import { VenueService } from './venue.service';
import { FacultyModule } from '../faculty/faculty.module';
import { VenueController } from './venue.controller';
import { AvailabilityModule } from '../availability/availability.module';

@Module({
  imports: [DatabaseModule, UserModule, FacultyModule, AvailabilityModule],
  providers: [venueProvider, VenueRepository, ErrorHelper, VenueService],
  controllers: [VenueController],
})
export class VenueModule {}
