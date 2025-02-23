import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const entities = [];

const services = [];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [...services],
  exports: [...services],
})
export class DBModule {}
