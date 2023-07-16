import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import {
  CreateDepartmentDto,
  DeleteDepartmentDto,
  EditDepartmentDto,
} from './department.dto';

@Controller('/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('')
  async addDepartment(
    @Body() body: CreateDepartmentDto,
    @Query('key') apiKey: string,
  ) {
    const data = await this.departmentService.addDepartment(body, apiKey);

    return {
      data,
      message: 'Department added successfully',
    };
  }

  @Get('')
  async getDepartments(@Query('key') apiKey: string) {
    const data = await this.departmentService.getDepartments(apiKey);

    return {
      data,
      message: 'Departments fetched',
    };
  }

  @Patch('')
  async editDepartment(
    @Body() body: EditDepartmentDto,
    @Query('key') apiKey: string,
  ) {
    const data = await this.departmentService.editDepartment(body, apiKey);

    return {
      data,
      message: 'Department edited',
    };
  }

  @Delete('')
  async deleteDepartment(
    @Body()
    body: DeleteDepartmentDto,
    @Query('key') apiKey: string,
  ) {
    await this.departmentService.deleteDepartment(body, apiKey);

    return {
      message: 'Department deleted',
    };
  }
}
