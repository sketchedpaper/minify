import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alias } from './aliases/alias.entity';
import { ConfigModule } from '@nestjs/config';

import { AliasModule } from './aliases/alias.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: Number(process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Alias],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    AliasModule,
  ],
})
export class AppModule {}
