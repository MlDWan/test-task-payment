import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserInfo } from './dtos/userInfo.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all-users')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get()
  async getUser(@Query() { user_id }): Promise<User> {
    return this.userService.getUser(user_id);
  }

  @Post()
  async createUser(
    @Body()
    userInfo: UserInfo,
  ): Promise<void> {
    return this.userService.createUser(userInfo);
  }
}
