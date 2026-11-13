import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { NewUser } from './new-user.js';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() user: NewUser) {
    return this.usersService.addUser(user);
  }

}

