import { Inject } from '@nestjs/common';
import { DB_FACULTY_PROVIDER_REPOSITORY_NAME } from 'src/modules/database/constants';
import { FacultyEntity } from 'src/modules/database/entities';
import { Repository, ILike } from 'typeorm';
import { ICreateFaculty, IEditFaculty } from './faculty.interface';

export class FacultyRepository {
  constructor(
    @Inject(DB_FACULTY_PROVIDER_REPOSITORY_NAME)
    private facultyRepository: Repository<FacultyEntity>,
  ) {}

  async findFaculty(privateApiKey: string, facultyId: string) {
    return this.facultyRepository.findOne({
      where: { user: { privateApiKey }, id: facultyId },
    });
  }

  async findFacultyByName(privateApiKey: string, facultyName: string) {
    return this.facultyRepository.findOne({
      where: { user: { privateApiKey }, facultyName: ILike(facultyName) },
    });
  }

  async getAllFaculty(privateApiKey: string) {
    return this.facultyRepository.find({ where: { user: { privateApiKey } } });
  }

  async saveFaculty(Faculty: ICreateFaculty) {
    return this.facultyRepository.save(Faculty);
  }

  async editFaculty(Faculty: IEditFaculty, facultyId: string) {
    return this.facultyRepository.update(facultyId, Faculty);
  }

  async deleteFaculty(Faculty: FacultyEntity) {
    return this.facultyRepository.remove(Faculty);
  }
}
