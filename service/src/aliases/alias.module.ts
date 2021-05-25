import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alias } from './alias.entity';
import { AliasController } from './alias.controller';
import { AliasService } from './alias.service';

@Module({
  imports: [TypeOrmModule.forFeature([Alias])],
  providers: [AliasService],
  controllers: [AliasController],
})
export class AliasModule {}
