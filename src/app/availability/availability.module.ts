import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/connections/database.module';
import { availabilityProvider } from 'src/modules/database/providers';
import { AvailabilityRepository } from './availability.repository';

@Module({
  imports: [DatabaseModule],
  providers: [availabilityProvider, AvailabilityRepository],
  exports: [availabilityProvider, AvailabilityRepository],
})
export class AvailabilityModule {}
