import { Injectable, ConflictException } from '@nestjs/common';
import { NewUser } from './new-user.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';



@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

    async addUser(user: NewUser) {
        try {
            const newUser = await this.prismaService.user.create({ data: user });
            return newUser;

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('User with this email already exists');
            }
            throw error;

        }
    }
}
