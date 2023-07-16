import { Injectable } from '@nestjs/common/decorators';
import { EncryptHelper, ErrorHelper } from 'src/core/helpers';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './user.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private encryptHelper: EncryptHelper,
  ) {}
  private logger = new Logger(UserService.name);

  async createBulkApiKeys(createUserDto: CreateUserDto[]) {
    createUserDto.map((user) => {
      return {
        ...user,
        apiKey: user.apiKey,
        privateApiKey: this.encryptHelper.hash(user.privateApiKey),
      };
    });
    return this.userRepository.createBulkUser(createUserDto);
  }

  async findUser(apiKey: string) {
    return this.userRepository.getUser(apiKey);
  }
  async validateUser(apiKey: string) {
    if (!apiKey) {
      ErrorHelper.UnauthorizedException('Unauthorized');
    }
    const user = await this.userRepository.getUser(apiKey);
    this.logger.log(await user);
    if (!user) {
      ErrorHelper.UnauthorizedException('Invalid api key');
    }

    return user;
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }
}
