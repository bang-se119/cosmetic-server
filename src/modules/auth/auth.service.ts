import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JWT, jwtConstants } from 'src/shared/constants/constants';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repositoryUser: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async loginUser(
    account: LoginUserDto,
    response: Response,
  ): Promise<{ access_token: string; refresh_token: string }> {
    // Destructuring
    const { email, password } = account;
    const user = await this.repositoryUser.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('The user is not exist!');
    }

    const checkCorrectAccount = await bcrypt.compare(password, user.password);
    if (!checkCorrectAccount) {
      throw new BadRequestException('Invalid password!');
    }

    const accessJwt = await this.jwtService.signAsync(
      { id: user.id, username: user.username },
      {
        secret: jwtConstants.secret,
        expiresIn: '1h',
      },
    );

    const refreshJwt = await this.jwtService.signAsync(
      { id: user.id, username: user.username },
      {
        secret: jwtConstants.secret,
        expiresIn: '7d',
      },
    );

    response.cookie(JWT, accessJwt, { httpOnly: true });

    return {
      access_token: accessJwt,
      refresh_token: refreshJwt,
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
