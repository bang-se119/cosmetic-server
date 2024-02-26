import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/api/user/register')
  @HttpCode(HttpStatus.OK)
  registerUser(@Body() user: RegisterUserDto) {
    return this.userService.registerUser(user);
  }

  @Get('/api/user/list')
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return this.userService.getUsers();
  }

  @Put('/api/user/update/:id')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }
}
