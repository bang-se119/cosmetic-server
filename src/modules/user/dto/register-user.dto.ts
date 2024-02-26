import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is not empty !' })
  @ApiProperty({ type: String, example: 'bangduy.se119@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone is not empty !' })
  @ApiProperty({ type: String, example: '0123456789' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is not empty !' })
  @ApiProperty({ type: String, example: 'user_123' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Fullname is not empty !' })
  @ApiProperty({ type: String, example: 'Dang Duy B' })
  fullname: string;

  @IsString()
  @IsNotEmpty({ message: 'Date of birth is not empty !' })
  @ApiProperty({ type: String, example: '1/1/20001' })
  date_of_birth: string;

  @IsString()
  @IsNotEmpty({ message: 'Gender is not empty !' })
  @ApiProperty({ type: String, example: 'Nam' })
  gender: string;

  @IsString()
  @IsNotEmpty({ message: 'Role is not empty !' })
  @ApiProperty({ type: String, example: 'user' })
  role: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is not empty !' })
  @ApiProperty({ type: String, example: 'A@123456' })
  password: string;
}
