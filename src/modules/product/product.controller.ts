import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AddNewProductDto } from './dto/add-new-product.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBody({ type: AddNewProductDto })
  @Post('/api/product/add')
  @HttpCode(HttpStatus.OK)
  addNewProduct(@Body() product: AddNewProductDto) {
    return this.productService.addNewProduct(product);
  }

  @Get('/api/product/list')
  getProducts() {
    const products = [];
    return products;
  }
}
