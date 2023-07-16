import { Injectable } from '@nestjs/common/decorators';

import { ErrorHelper } from 'src/core/helpers';

import { UserService } from 'src/app/user/user.service';
import { CourseRepository } from './course.repository';
import { CreateCourseDto, EditCourseDto } from './course.dto';
import { ICreateCourse, IEditCourse } from './course.interface';
import { DepartmentService } from '../department/department.service';
import { LecturerService } from '../lecturer/lecturer.service';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private userService: UserService,
    private departmentService: DepartmentService,
    private lecturerService: LecturerService,
  ) {}

  async addCourse(createCourseDto: CreateCourseDto, apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    const departments = await this.departmentService.findDepartments(
      createCourseDto.departmentIds,
      user.apiKey,
    );

    if (departments.length < 1) {
      ErrorHelper.NotFoundException('departments not found');
    }

    const lecturers = await this.lecturerService.findLecturers(
      user.apiKey,
      createCourseDto.lecturerIds,
    );

    if (lecturers.length < 1) {
      ErrorHelper.NotFoundException('lecturers not found');
    }

    const data: ICreateCourse = {
      ...createCourseDto,
      user,
      departments,
      lecturers,
    };

    return this.courseRepository.saveCourse(data);
  }

  async editCourse(editCourseDto: EditCourseDto, apiKey: string) {
    const user = await this.userService.validateUser(apiKey);

    const course = await this.courseRepository.findCourse(
      user.privateApiKey,
      editCourseDto.id,
    );
    if (!course) {
      ErrorHelper.NotFoundException('Course not found');
    }

    const departments = await this.departmentService.findDepartments(
      editCourseDto.departmentIds,
      user.apiKey,
    );

    if (departments.length < 0) {
      ErrorHelper.NotFoundException('departments not found');
    }

    const lecturers = await this.lecturerService.findLecturers(
      user.apiKey,
      editCourseDto.lecturerIds,
    );

    if (lecturers.length < 0) {
      ErrorHelper.NotFoundException('lecturers not found');
    }

    const data: IEditCourse = {
      ...course,
      ...editCourseDto,
      user,
      departments,
      lecturers,
    };
    return this.courseRepository.editCourse(data);
  }

  async deleteCourse(courseId: string, apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    const course = await this.courseRepository.findCourse(
      user.privateApiKey,
      courseId,
    );
    if (!course) {
      ErrorHelper.BadRequestException('No course found');
    }

    return this.courseRepository.deleteCourse(course);
  }

  async getCourses(apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    if (user) {
      return this.courseRepository.getAllCourses(user.privateApiKey);
    }
  }
}
