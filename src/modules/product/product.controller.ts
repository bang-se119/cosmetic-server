import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AddNewProductDto } from './dto/add-new-product.dto';
import { ApiBody } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';

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
  @HttpCode(HttpStatus.OK)
  getProducts() {
    return this.productService.getProducts();
  }

  @ApiBody({ type: UpdateProductDto })
  @Put('/api/product/update/:id')
  @HttpCode(HttpStatus.OK)
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, product);
  }

  @Delete('/api/product/delete/:id')
  @HttpCode(HttpStatus.OK)
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
