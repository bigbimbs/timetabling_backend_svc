import { Injectable } from '@nestjs/common/decorators';

import { ErrorHelper } from 'src/core/helpers';

import { UserService } from 'src/app/user/user.service';

import { LecturerRepository } from './lecturer.repository';
import { CreateLecturerDto, EditLecturerDto } from './lecturer.dto';
import { ICreateLecturer } from './lecturer.interface';
import { LecturersEntity } from 'src/modules/database/entities';

@Injectable()
export class LecturerService {
  constructor(
    private readonly lecturerRepository: LecturerRepository,
    private userService: UserService,
  ) {}

  async addLecturer(createLecturerDto: CreateLecturerDto, apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    const data: ICreateLecturer = {
      ...createLecturerDto,
      user,
    };

    return this.lecturerRepository.saveLecturer(data);
  }

  async editLecturer(editLecturerDto: EditLecturerDto, apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    const lecturer = await this.lecturerRepository.findLecturer(
      user.privateApiKey,
      editLecturerDto.id,
    );
    if (!lecturer) {
      ErrorHelper.BadRequestException('No lecturer found');
    }
    return this.lecturerRepository.editLecturer(editLecturerDto);
  }

  async deleteLecturer(lecturerId: string, apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    const lecturer = await this.lecturerRepository.findLecturer(
      user.privateApiKey,
      lecturerId,
    );
    if (!lecturer) {
      ErrorHelper.BadRequestException('No lecturer found');
    }
    return this.lecturerRepository.deleteLecturer(lecturer);
  }

  async deleteLecturers(lecturers: LecturersEntity[]) {
    return this.lecturerRepository.deleteLecturers(lecturers);
  }

  async getLecturers(apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    if (user) {
      return this.lecturerRepository.getAllLecturers(user.privateApiKey);
    }
  }

  async findLecturers(apiKey: string, lecturerIds: string[]) {
    const user = await this.userService.validateUser(apiKey);
    return this.lecturerRepository.findLecturers(
      user.privateApiKey,
      lecturerIds,
    );
  }
}
