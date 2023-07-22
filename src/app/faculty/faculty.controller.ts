import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { FacultyService } from './faculty.service';
import {
  CreateFacultyDto,
  DeleteFacultyDto,
  EditFacultyDto,
} from './faculty.dto';

@Controller('/faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post('')
  async addFaculty(
    @Body() body: CreateFacultyDto,
    @Query('key') apiKey: string,
  ) {
    const data = await this.facultyService.addFaculty(body, apiKey);

    return {
      data,
      message: 'Faculty added successfully',
    };
  }

  @Get('')
  async getFaculties(@Query('key') apiKey: string) {
    const data = await this.facultyService.getFaculties(apiKey);

    return {
      data,
      message: 'Faculties fetched',
    };
  }

  @Patch('')
  async editFaculty(
    @Body() body: EditFacultyDto,
    @Query('key') apiKey: string,
  ) {
    await this.facultyService.editFaculty(body, apiKey);

    return {
      message: 'Faculty edited',
    };
  }

  // @Delete('')
  // async deleteFaculty(
  //   @Body() body: DeleteFacultyDto,
  //   @Query('key') apiKey: string,
  // ) {
  //   const data = await this.facultyService.deleteFaculty(body.id, apiKey);

  //   return {
  //     data,
  //     message: 'Faculty deleted',
  //   };
  // }
}
