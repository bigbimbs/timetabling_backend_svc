import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { ConfigService } from 'src/core/config/config.service';

@Module({
  providers: [...databaseProviders, ConfigService],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
