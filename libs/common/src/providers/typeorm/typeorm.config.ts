import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';
import { join } from "path";
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "./entities";

const configService = new ConfigService();

const NODE_ENV:string = configService.get<string>('NODE_ENV') || 'local';
const IS_PROD: boolean = NODE_ENV === 'prod';

config({path: join(process.cwd(), 'config', `.env.${NODE_ENV}`)});

const options = (): DataSourceOptions => {
    const host     = process.env.POSTGRE_HOST
    const port     = +process.env.POSTGRE_PORT;
    const database = process.env.POSTGRE_DB;
    const username = process.env.POSTGRE_USER;
    const password = process.env.POSTGRE_PASSWORD;
    
    if (!host || !port || !database || !username || !password) throw new Error('Database options was skiped.');

    return {
        host,
        port, 
        database,
        username, 
        password,
        type                : 'postgres',
        schema              : 'public',
        logging             : !IS_PROD,
        entities            : [UserEntity],
        //migrationsRun       : true,
        //migrationsTableName : 'migrations',
        //migrations: [join(process.cwd(), 'migrations', '**', '*{.ts,.js}')],
    }
} 

export const appDataSource = new DataSource(options())