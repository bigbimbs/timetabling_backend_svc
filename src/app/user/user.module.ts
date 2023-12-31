import { Module } from '@nestjs/common';
import { EncryptHelper } from 'src/core/helpers';
import { DatabaseModule } from 'src/modules/database/connections/database.module';
import { userProvider } from 'src/modules/database/providers';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [userProvider, UserRepository, EncryptHelper, UserService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
