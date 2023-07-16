import { Injectable } from '@nestjs/common/decorators';

import { ErrorHelper } from 'src/core/helpers';

import { UserService } from 'src/app/user/user.service';
import { FacultyRepository } from './faulty.repository';
import { CreateFacultyDto, EditFacultyDto } from './faculty.dto';
import { ICreateFaculty } from './faculty.interface';

@Injectable()
export class FacultyService {
  constructor(
    private readonly facultyRepository: FacultyRepository,
    private userService: UserService,
  ) {}

  async addFaculty(createFacultyDto: CreateFacultyDto, apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    const data: ICreateFaculty = {
      ...createFacultyDto,
      user,
    };
    const faculty = await this.facultyRepository.findFacultyByName(
      user.privateApiKey,
      data.facultyName,
    );

    if (faculty) {
      ErrorHelper.BadRequestException('Faculty already exists');
    }
    return this.facultyRepository.saveFaculty(data);
  }

  async editFaculty(editFacultyDto: EditFacultyDto, apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    const faculty = await this.facultyRepository.findFaculty(
      user.privateApiKey,
      editFacultyDto.id,
    );
    if (!faculty) {
      ErrorHelper.BadRequestException('No Faculty found');
    }
    return this.facultyRepository.editFaculty(
      editFacultyDto,
      editFacultyDto.id,
    );
  }

  async deleteFaculty(facultyId: string, apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    const Faculty = await this.facultyRepository.findFaculty(
      user.privateApiKey,
      facultyId,
    );
    if (!Faculty) {
      ErrorHelper.BadRequestException('No Faculty found');
    }
    return this.facultyRepository.deleteFaculty(Faculty);
  }

  async getFaculties(apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    if (user) {
      return this.facultyRepository.getAllFaculty(user.privateApiKey);
    }
  }

  async getFaculty(apiKey: string, facultyId: string) {
    const user = await this.userService.validateUser(apiKey);

    if (user) {
      return this.facultyRepository.findFaculty(user.privateApiKey, facultyId);
    }
  }
}
