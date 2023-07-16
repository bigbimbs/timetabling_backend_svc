import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CourseEntity } from 'src/modules/database/entities';
import { DB_COURSE_PROVIDER_REPOSITORY_NAME } from 'src/modules/database/constants';
import { ICreateCourse } from './course.interface';
import { IEditLecturer } from '../lecturer/lecturer.interface';

export class CourseRepository {
  constructor(
    @Inject(DB_COURSE_PROVIDER_REPOSITORY_NAME)
    private courseRepository: Repository<CourseEntity>,
  ) {}

  async findCourse(privateApiKey: string, courseId: string) {
    return this.courseRepository.findOne({
      where: { user: { privateApiKey }, id: courseId },
      relations: ['departments', 'lecturers'],
    });
  }
  async getAllCourses(privateApiKey: string) {
    return this.courseRepository.find({
      where: { user: { privateApiKey } },
      relations: ['departments', 'lecturers'],
    });
  }

  async saveCourse(course: ICreateCourse) {
    return this.courseRepository.save(course);
  }

  async editCourse(course: IEditLecturer) {
    return this.courseRepository.save(course);
  }

  async deleteCourse(course: CourseEntity) {
    return this.courseRepository.remove(course);
  }
}
