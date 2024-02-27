import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email is not empty!' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Email is not empty!' })
  @IsString()
  password: string;
}
