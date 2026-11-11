import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { ConfigService } from '@nestjs/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';


@Injectable()
export class PrismaService extends PrismaClient {
    constructor( configService: ConfigService) {
        const address = configService.get('DATABASE_URL');
        const plugin = new PrismaBetterSqlite3({ url: address });
        super({ adapter : plugin });
    }


}

