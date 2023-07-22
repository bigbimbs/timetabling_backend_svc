import { Inject, Injectable } from '@nestjs/common/decorators';
import { EncryptHelper, ErrorHelper } from 'src/core/helpers';
import { UserRepository } from './user.repository';
import { ConfigurationDto, CreateUserDto } from './user.dto';
import { Logger } from '@nestjs/common';
import { DB_CONFIGURATION_PROVIDER_REPOSITORY_NAME } from 'src/modules/database/constants';
import { ConfigurationEntity } from 'src/modules/database/entities/configuration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private encryptHelper: EncryptHelper,
    @Inject(DB_CONFIGURATION_PROVIDER_REPOSITORY_NAME)
    private configurationRepository: Repository<ConfigurationEntity>,
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

  async saveConfiguration(configurationDto: ConfigurationDto, apiKey: string) {
    const user = await this.validateUser(apiKey);

    const config = await this.configurationRepository.findOne({
      where: { userId: user.id },
    });

    if (config) {
      return await this.configurationRepository.update(
        { userId: user.id },
        configurationDto,
      );
    }

    return await this.configurationRepository.save({
      ...configurationDto,
      userId: user.id,
    });
  }
  async getUserConfiguration(apiKey: string) {
    const user = await this.validateUser(apiKey);

    const config = await this.configurationRepository.findOne({
      where: { userId: user.id },
    });

    if (config) {
      return config;
    }
    ErrorHelper.NotFoundException('No configuration settings');
  }
}
