import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayMinSize,
  ArrayNotEmpty,
  IsIn,
} from 'class-validator';

export class CreateCourseDto {
  @IsString({ message: 'course name is required' })
  @IsNotEmpty()
  name: string;

  @IsString({ message: 'course code is required' })
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsIn([1, 2])
  semester: number;

  @IsOptional()
  @IsString({ message: 'course name is required' })
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  percentageAllowedToBeFilled: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  lecturerIds: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  departmentIds: string[];
}

export class EditCourseDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsOptional()
  @IsIn([1, 2])
  semester: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  percentageAllowedToBeFilled: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  lecturerIds: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  departmentIds: string[];
}

export class DeleteCourseDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
