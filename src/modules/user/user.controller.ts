import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/api/users')
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return this.userService.getUsers();
  }
}
