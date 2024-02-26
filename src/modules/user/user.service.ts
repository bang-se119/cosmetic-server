import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repositoryUser: Repository<UserEntity>,
  ) {}

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

  async getUsers() {
    const responsesData = await this.repositoryUser.find();
    return {
      message: 'Get all users successfully!',
      data: responsesData,
    };
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const { password } = user;

    // Change password and encode
    if (password) {
      const passwordHashed = await bcrypt.hash(password, 12);
      user = { ...user, password: passwordHashed };
    }

    const userFind = await this.repositoryUser.findOneBy({
      id: id,
    });

    if (!userFind) {
      throw new BadRequestException('User is not exist !');
    }

    const userUpdated = await this.repositoryUser.save({
      ...userFind,
      ...user,
    });

    return {
      message: 'The user is updated successfully!',
      data: userUpdated,
    };
  }
}
