import { Inject } from '@nestjs/common';
import {
  DB_DEPARTMENT_PROVIDER_REPOSITORY_NAME,
  DB_LEVEL_PROVIDER_REPOSITORY_NAME,
} from 'src/modules/database/constants';
import { DepartmentEntity, LevelEntity } from 'src/modules/database/entities';
import { Repository, In } from 'typeorm';
import { ICreateDepartment, IEditDepartment } from './department.interface';

export class DepartmentRepository {
  constructor(
    @Inject(DB_DEPARTMENT_PROVIDER_REPOSITORY_NAME)
    private departmentRepository: Repository<DepartmentEntity>,
    @Inject(DB_LEVEL_PROVIDER_REPOSITORY_NAME)
    private levelRepository: Repository<LevelEntity>,
  ) {}

  async findDepartment(privateApiKey: string, departmentId: string) {
    return this.departmentRepository.findOne({
      where: { id: departmentId, user: { privateApiKey } },
      relations: ['faculty', 'course', 'levels'],
    });
  }

  async findDepartments(privateApiKey: string, departmentId: string[]) {
    return this.departmentRepository.find({
      where: { id: In(departmentId), user: { privateApiKey } },
      relations: ['faculty', 'course', 'levels'],
    });
  }
  async getAllDepartments(privateApiKey: string) {
    return this.departmentRepository.find({
      where: { user: { privateApiKey } },
      relations: ['faculty', 'course', 'levels'],
    });
  }

  async saveDepartment(department: ICreateDepartment) {
    return this.departmentRepository.save(department);
  }

  async editDepartment(department: IEditDepartment) {
    return this.departmentRepository.save(department);
  }

  async deleteDepartment(department: DepartmentEntity) {
    const levelIds = department.levels.map((level) => level.id);
    if (levelIds.length > 0) {
      await this.levelRepository.delete(levelIds);
    }
    return this.departmentRepository.remove(department);
  }
}
