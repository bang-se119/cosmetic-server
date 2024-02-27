import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repositoryUser: Repository<UserEntity>,
  ) {}
  async loginUser(account: LoginUserDto) {
    return {
      message: 'Login successfully!',
      data: account,
    };
  }

  async registerUser(user: RegisterUserDto) {
    // Destructuring to get password from user object
    const { password } = user;
    const passwordHashed = await bcrypt.hash(password, 12);
    const userNew = { ...user, password: passwordHashed };
    const requestData = await this.repositoryUser.save(userNew);
    return {
      message: 'A new user is registered successfully!',
      data: requestData,
    };
  }

  async deleteUser(id: number) {
    const productFind = await this.repositoryUser.findOneBy({
      id: id,
    });

    if (!productFind) {
      throw new BadRequestException('Product is not exist !');
    }

    const productDeleted = await this.repositoryUser.remove(productFind);

    return {
      message: 'The product is deleted successfully',
      data: productDeleted,
    };
  }
}
