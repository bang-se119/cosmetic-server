import { Injectable } from '@nestjs/common';
import { AddNewProductDto } from './dto/add-new-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async addNewProduct(product: AddNewProductDto) {
    const requestData = await this.productRepository.save(product);
    return {
      message: 'A new product is added successfully!',
      data: requestData,
    };
  }

  async getProducts() {
    const responses = await this.productRepository.find();
    return {
      message: 'Get all products successfully!',
      data: responses,
    };
  }
}
