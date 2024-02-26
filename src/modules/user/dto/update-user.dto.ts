import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  date_of_birth: string;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  password: string;
}
