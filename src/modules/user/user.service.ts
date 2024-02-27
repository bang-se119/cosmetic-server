import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    const responsesData = await this.userRepository.find();
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

    const userFind = await this.userRepository.findOneBy({
      id: id,
    });

    if (!userFind) {
      throw new BadRequestException('User is not exist !');
    }

    const userUpdated = await this.userRepository.save({
      ...userFind,
      ...user,
    });

    return {
      message: 'The user is updated successfully!',
      data: userUpdated,
    };
  }
}
