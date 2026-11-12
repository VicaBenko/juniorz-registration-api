import { Injectable } from '@nestjs/common';
import { NewUser } from './new-user.js';
import { PrismaService } from '../prisma/prisma.service.js';



@Injectable()
export class UsersService {
 constructor(private readonly prismaService: PrismaService) {}
       
 async addUser(user: NewUser) {
    const newUser = await this.prismaService.user.create({ data: user });
            return newUser;
        
    }
}
