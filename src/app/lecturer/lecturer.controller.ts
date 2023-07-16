import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import {
  CreateLecturerDto,
  DeleteLecturerDto,
  EditLecturerDto,
} from './lecturer.dto';

@Controller('/lecturer')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @Post('')
  async addLecturer(
    @Body() body: CreateLecturerDto,
    @Query('key') apiKey: string,
  ) {
    const data = await this.lecturerService.addLecturer(body, apiKey);

    return {
      data,
      message: 'Lecturer added successfully',
    };
  }

  @Get('')
  async getLecturers(@Query('key') apiKey: string) {
    const data = await this.lecturerService.getLecturers(apiKey);

    return {
      data,
      message: 'Lecturers fetched',
    };
  }

  @Patch('')
  async editLecturers(
    @Body() body: EditLecturerDto,
    @Query('key') apiKey: string,
  ) {
    const data = await this.lecturerService.editLecturer(body, apiKey);

    return {
      data,
      message: 'Lecturer edited',
    };
  }

  @Delete('')
  async deleteLecturer(
    @Body() body: DeleteLecturerDto,
    @Query('key') apiKey: string,
  ) {
    const data = await this.lecturerService.deleteLecturer(body.id, apiKey);

    return {
      data,
      message: 'Lecturer deleted',
    };
  }
}
