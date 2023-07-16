import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/database/entities';
import { DB_USER_PROVIDER_REPOSITORY_NAME } from 'src/modules/database/constants';
import { CreateUserDto } from './user.dto';

export class UserRepository {
  constructor(
    @Inject(DB_USER_PROVIDER_REPOSITORY_NAME)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUser(apiKey: string) {
    return this.userRepository.findOne({ where: { apiKey: apiKey } });
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  async createUser(user: CreateUserDto) {
    return this.userRepository.save(user);
  }
  async createBulkUser(user: CreateUserDto[]) {
    return this.userRepository.save(user);
  }

  async deleteUser(user: UserEntity) {
    return this.userRepository.remove(user);
  }
}
