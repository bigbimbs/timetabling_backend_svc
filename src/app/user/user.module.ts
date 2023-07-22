import { Module } from '@nestjs/common';
import { EncryptHelper } from 'src/core/helpers';
import { DatabaseModule } from 'src/modules/database/connections/database.module';
import {
  configurationProvider,
  userProvider,
} from 'src/modules/database/providers';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    userProvider,
    UserRepository,
    configurationProvider,
    EncryptHelper,
    UserService,
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
