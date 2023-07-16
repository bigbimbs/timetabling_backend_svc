import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AvailabilityEntity, TimeEntity } from 'src/modules/database/entities';
import {
  DB_AVAILABILITY_PROVIDER_REPOSITORY_NAME,
  DB_TIME_PROVIDER_REPOSITORY_NAME,
} from 'src/modules/database/constants';

export class AvailabilityRepository {
  constructor(
    @Inject(DB_AVAILABILITY_PROVIDER_REPOSITORY_NAME)
    private availabilityRepository: Repository<AvailabilityEntity>,
    @Inject(DB_TIME_PROVIDER_REPOSITORY_NAME)
    private timeRepo: Repository<TimeEntity>,
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

  async getByIds(availabilityId: string | string[]) {
    return await this.availabilityRepository
      .createQueryBuilder('availability') // Replace 'entity' with your actual entity name
      .where('entity.id IN (:...ids)', { availabilityId }) // Use the IN operator to match the IDs
      .getMany();
  }

  async deleteAvailability(
    availabilityId: string | string[],
    timeIds: string[],
  ) {
    // const availabilities = await this.getByIds(availabilityId);
    // if (availabilities.length > 0) {
    //   const timeIds = [];
    //   availabilities.forEach((ava) =>
    //     ava.time.forEach((time) => {
    //       timeIds.push(time);
    //       return time;
    //     }),
    //   );
    //   if (timeIds.length > 0) {
    //     await this.timeRepo.delete(timeIds);
    //   }
    // }

    if (timeIds.length > 0) {
      await this.timeRepo.delete(timeIds);
    }

    return this.availabilityRepository.delete(availabilityId);
  }
}
