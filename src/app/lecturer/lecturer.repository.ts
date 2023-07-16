import { Inject } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { LecturersEntity } from 'src/modules/database/entities';
import { DB_LECTURER_PROVIDER_REPOSITORY_NAME } from 'src/modules/database/constants';
import { ICreateLecturer, IEditLecturer } from './lecturer.interface';
import { AvailabilityRepository } from '../availability/availability.repository';

export class LecturerRepository {
  constructor(
    @Inject(DB_LECTURER_PROVIDER_REPOSITORY_NAME)
    private lecturerRepository: Repository<LecturersEntity>,
    private readonly availabilityRepository: AvailabilityRepository,
  ) {}

  async findLecturer(privateApiKey: string, lecturerId: string) {
    return this.lecturerRepository.findOne({
      where: { user: { privateApiKey }, id: lecturerId },
      relations: ['availableDaysAndTimes', 'availableDaysAndTimes.time'],
    });
  }
  async findLecturers(privateApiKey: string, lecturerId: string[]) {
    return this.lecturerRepository.find({
      where: { user: { privateApiKey }, id: In(lecturerId) },
      relations: ['availableDaysAndTimes', 'availableDaysAndTimes.time'],
    });
  }
  async getAllLecturers(privateApiKey: string) {
    return this.lecturerRepository.find({
      where: { user: { privateApiKey } },
      relations: ['availableDaysAndTimes', 'availableDaysAndTimes.time'],
    });
  }

  async saveLecturer(lecturer: ICreateLecturer) {
    return this.lecturerRepository.save(lecturer);
  }

  async editLecturer(lecturer: IEditLecturer) {
    return this.lecturerRepository.save(lecturer);
  }

  async deleteLecturer(lecturer: LecturersEntity) {
    const timeIds = [];
    const availabilityIds = [];
    lecturer.availableDaysAndTimes.forEach((availability) => {
      availabilityIds.push(availability.id);
      availability.time.forEach((tm) => {
        timeIds.push(tm.id);
      });
    });

    if (availabilityIds.length > 0) {
      await this.availabilityRepository.deleteAvailability(
        availabilityIds,
        timeIds,
      );
    }

    return this.lecturerRepository.remove(lecturer);
  }

  async deleteLecturers(lecturers: LecturersEntity[]) {
    const timeIds = [];
    const availabilityIds = [];
    lecturers.forEach((lecturer) => {
      lecturer.availableDaysAndTimes.forEach((availability) => {
        availabilityIds.push(availability.id);
        availability.time.forEach((tm) => {
          timeIds.push(tm.id);
        });
      });
    });

    if (availabilityIds.length > 0) {
      await this.availabilityRepository.deleteAvailability(
        availabilityIds,
        timeIds,
      );
    }

    return this.lecturerRepository.remove(lecturers);
  }
}
