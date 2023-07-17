import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateFacultyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  facultyName: string;
}

export class EditFacultyDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  facultyName: string;
}

export class DeleteFacultyDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
