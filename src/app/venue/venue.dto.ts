import {
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsNotEmpty,
  ArrayMinSize,
  IsOptional,
  Min,
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

export class CreateVenueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber({})
  @Min(1)
  capacity: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AvailableDayDto)
  availableDaysAndTimes: AvailableDayDto[];
}

export class EditVenueDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  capacity: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AvailableDayDto)
  availableDaysAndTimes: AvailableDayDto[];
}

export class DeleteVenueDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
