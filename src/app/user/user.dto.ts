import {
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  ArrayMinSize,
  IsNumber,
  Max,
  Min,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateUserDto {
  name: string;
  apiKey: string;
  privateApiKey: string;
}

export class ConfigurationDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsNumber({}, { message: 'Your start time must be a valid number' })
  @Min(8, { message: 'Your start time must be greater than or equal to 8' })
  @Max(12, { message: 'Your start time must be less than or equal to 12' })
  startTime: number;

  @IsNumber({}, { message: 'Your timetable end time must be a valid number' })
  @Min(12, {
    message: 'Your timetable end time must be greater than or equal to 12',
  })
  @Max(20, {
    message: 'Your timetable end time must be less than or equal to 20',
  })
  endTime: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  weekdays: string[];
}
