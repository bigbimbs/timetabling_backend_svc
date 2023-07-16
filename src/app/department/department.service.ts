import { Injectable } from '@nestjs/common/decorators';
import { ErrorHelper } from 'src/core/helpers';
import { UserService } from 'src/app/user/user.service';
import {
  CreateDepartmentDto,
  DeleteDepartmentDto,
  EditDepartmentDto,
} from './department.dto';
import { ICreateDepartment } from './department.interface';
import { DepartmentRepository } from './department.repository';
import { FacultyService } from '../faculty/faculty.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    private userService: UserService,
    private facultyService: FacultyService,
  ) {}
  private logger = new Logger(DepartmentService.name);

  async addDepartment(
    createDepartmentDto: CreateDepartmentDto,
    apiKey: string,
  ) {
    this.logger.log(apiKey);
    const user = await this.userService.validateUser(apiKey);
    const faculty = await this.facultyService.getFaculty(
      user.apiKey,
      createDepartmentDto.facultyId,
    );
    if (!faculty) {
      ErrorHelper.NotFoundException('Faculty not found');
    }
    const data: ICreateDepartment = {
      ...createDepartmentDto,
      user: user,
      faculty: faculty,
    };

    return this.departmentRepository.saveDepartment(data);
  }

  async editDepartment(editDepartmentDto: EditDepartmentDto, apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    const department = await this.departmentRepository.findDepartment(
      user.privateApiKey,
      editDepartmentDto.id,
    );
    if (!department) {
      ErrorHelper.BadRequestException('No department found');
    }

    return this.departmentRepository.editDepartment({ ...editDepartmentDto });
  }

  async deleteDepartment(
    deleteDepartmentDto: DeleteDepartmentDto,
    apiKey: string,
  ) {
    const user = await this.userService.validateUser(apiKey);
    const department = await this.departmentRepository.findDepartment(
      user.privateApiKey,
      deleteDepartmentDto.id,
    );
    if (!department) {
      ErrorHelper.BadRequestException('No department found');
    }
    return this.departmentRepository.deleteDepartment(department);
  }

  async getDepartments(apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    if (user) {
      return this.departmentRepository.getAllDepartments(user.privateApiKey);
    }
  }

  async findDepartments(departmentIds: string[], apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    if (user) {
      return this.departmentRepository.findDepartments(
        user.privateApiKey,
        departmentIds,
      );
    }
  }
}
