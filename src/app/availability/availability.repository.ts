import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AvailabilityEntity } from 'src/modules/database/entities';
import { DB_AVAILABILITY_PROVIDER_REPOSITORY_NAME } from 'src/modules/database/constants';

export class AvailabilityRepository {
  constructor(
    @Inject(DB_AVAILABILITY_PROVIDER_REPOSITORY_NAME)
    private availabilityRepository: Repository<AvailabilityEntity>,
  ) {}

  async findAvailability(availabilityId: string) {
    return this.availabilityRepository.findOne({
      where: { id: availabilityId },
      relations: ['time'],
    });
  }
  async getAllAvailability() {
    return this.availabilityRepository.find({
      relations: ['time'],
    });
  }

  async saveAvailability(availability: AvailabilityEntity) {
    return this.availabilityRepository.save(availability);
  }

  async editAvailability(availability: AvailabilityEntity) {
    return this.availabilityRepository.save(availability);
  }

  async deleteAvailability(availabilityId: string | string[]) {
    return this.availabilityRepository.delete(availabilityId);
  }
}
