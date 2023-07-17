import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsNotEmpty,
  ArrayMinSize,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

class TimeDto {
  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}

class AvailableDayDto {
  @IsString()
  day: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TimeDto)
  time: TimeDto[];
}

export class CreateLecturerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  initials: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AvailableDayDto)
  availableDaysAndTimes: AvailableDayDto[];
}

export class EditLecturerDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  initials: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AvailableDayDto)
  availableDaysAndTimes: AvailableDayDto[];
}

export class DeleteLecturerDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
