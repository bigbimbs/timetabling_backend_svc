import {
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsNotEmpty,
  ArrayMinSize,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

class LevelDto {
  @IsNumber()
  level: number;

  @IsNumber()
  numOfStudents: number;
}

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  facultyId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  departmentName: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => LevelDto)
  levels: LevelDto[];
}

export class EditDepartmentDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  departmentName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  code: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => LevelDto)
  levels: LevelDto[];
}

export class DeleteDepartmentDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
