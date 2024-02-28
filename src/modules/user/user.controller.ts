import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/api/user/list')
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Put('/api/user/update/:id')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }
}
