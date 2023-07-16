import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/connections/database.module';
import {
  availabilityProvider,
  timeProvider,
} from 'src/modules/database/providers';
import { AvailabilityRepository } from './availability.repository';

@Module({
  imports: [DatabaseModule],
  providers: [availabilityProvider, timeProvider, AvailabilityRepository],
  exports: [availabilityProvider, AvailabilityRepository],
})
export class AvailabilityModule {}
