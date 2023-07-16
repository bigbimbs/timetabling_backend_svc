import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFacultyDto {
  @IsString()
  @IsNotEmpty()
  facultyName: string;
}

export class EditFacultyDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  facultyName: string;
}

export class DeleteFacultyDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
