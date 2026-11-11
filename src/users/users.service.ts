import { Injectable } from '@nestjs/common';
import { NewUser } from './new-user.js';


@Injectable()
export class UsersService {
        create(user: NewUser) {
            return user;
        
    }
}
