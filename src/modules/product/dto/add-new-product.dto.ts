import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddNewProductDto {
  @IsNotEmpty({ message: 'Barcode is not empty !' })
  @ApiProperty({ type: Number, example: '0101010101' })
  barcode: number;

  @IsString()
  @ApiProperty({ type: String, example: 'KCN' })
  short_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is not empty !' })
  @ApiProperty({ type: String, example: 'Kem Chong Nang' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, example: 'Sunplay' })
  brand: string;

  @IsString()
  @ApiProperty({ type: String, example: 'Cong dung cua kem chong nang' })
  description: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsString()
  original_price: string;

  @IsString()
  selling_price: string;

  @IsString()
  discount_price: string;

  @IsOptional()
  @IsNumber()
  avg_point: number;

  @IsOptional()
  @IsNumber()
  number_review: number;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  category_id: number;

  @IsOptional()
  @IsNumber()
  user_id: number;
}
