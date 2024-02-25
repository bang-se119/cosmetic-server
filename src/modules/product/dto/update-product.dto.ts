import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNumber()
  barcode: number;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  short_name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  @IsString()
  original_price: string;

  @IsOptional()
  @IsString()
  selling_price: string;

  @IsOptional()
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
