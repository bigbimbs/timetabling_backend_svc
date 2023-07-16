import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, DeleteCourseDto, EditCourseDto } from './course.dto';

@Controller('/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('')
  async addCourse(@Body() body: CreateCourseDto, @Query('key') apiKey: string) {
    const data = await this.courseService.addCourse(body, apiKey);

    return {
      data,
      message: 'Course added successfully',
    };
  }

  @Get('')
  async getCourses(@Query('key') apiKey: string) {
    const data = await this.courseService.getCourses(apiKey);

    return {
      data,
      message: 'Courses fetched',
    };
  }

  @Patch('')
  async editCourses(@Body() body: EditCourseDto, @Query('key') apiKey: string) {
    const data = await this.courseService.editCourse(body, apiKey);

    return {
      data,
      message: 'Course edited',
    };
  }

  @Delete('')
  async deleteCourse(
    @Body() body: DeleteCourseDto,
    @Query('key') apiKey: string,
  ) {
    await this.courseService.deleteCourse(body.id, apiKey);

    return {
      message: 'Course deleted',
    };
  }
}
