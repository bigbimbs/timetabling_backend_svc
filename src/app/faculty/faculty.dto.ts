import { IsString, IsNotEmpty, Min } from 'class-validator';

export class CreateFacultyDto {
  @IsString()
  @IsNotEmpty()
  @Min(3)
  facultyName: string;
}

export class EditFacultyDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Min(3)
  facultyName: string;
}

export class DeleteFacultyDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
