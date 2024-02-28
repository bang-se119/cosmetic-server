import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/api/auth/login')
  loginUser(
    @Body() account: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.loginUser(account, response);
  }

  @UseGuards(AuthGuard)
  @Get('/api/auth/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/api/auth/register')
  registerUser(@Body() user: RegisterUserDto) {
    return this.authService.registerUser(user);
  }

  @Delete('/api/auth/delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteUser(id);
  }
}
