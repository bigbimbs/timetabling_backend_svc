import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VenuesEntity } from 'src/modules/database/entities';
import { DB_VENUE_PROVIDER_REPOSITORY_NAME } from 'src/modules/database/constants';
import { ICreateVenue, IEditVenue } from './venue.interface';
import { AvailabilityRepository } from '../availability/availability.repository';

export class VenueRepository {
  constructor(
    @Inject(DB_VENUE_PROVIDER_REPOSITORY_NAME)
    private venueRepository: Repository<VenuesEntity>,
    private readonly availabilityRepository: AvailabilityRepository,
  ) {}

  //   async getAllVenues(privateApiKey: string) {
  //     return this.venueRepository
  //       .createQueryBuilder('venue')
  //       .innerJoin('venue.user', 'user')
  //       .where('user.privateApiKey = :privateApiKey', { privateApiKey })
  //       .getMany();
  //   }
  async findVenue(privateApiKey: string, venueId: string) {
    return this.venueRepository.findOne({
      where: { user: { privateApiKey }, id: venueId },
      relations: ['availableDaysAndTimes', 'availableDaysAndTimes.time'],
    });
  }
  async getAllVenues(privateApiKey: string) {
    return this.venueRepository.find({
      where: { user: { privateApiKey } },
      relations: ['availableDaysAndTimes', 'availableDaysAndTimes.time'],
    });
  }

  async saveVenue(venue: ICreateVenue) {
    return this.venueRepository.save(venue);
  }

  async editVenue(venue: IEditVenue) {
    return this.venueRepository.save(venue);
  }

  async deleteVenue(venue: VenuesEntity) {
    const availabilityIds = venue.availableDaysAndTimes.map(
      (availability) => availability.id,
    );

    if (availabilityIds.length > 0) {
      await this.availabilityRepository.deleteAvailability(availabilityIds);
    }
    return this.venueRepository.remove(venue);
  }
}
