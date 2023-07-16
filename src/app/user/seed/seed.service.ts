import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from '../user.service';
import { usersSeedData } from './data';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private logger = new Logger(SeedService.name);

  constructor(private userService: UserService) {}
  async onApplicationBootstrap() {
    this.logger.log('Seeding...');
    this.seedApiKeys();
  }

  async seedApiKeys() {
    const usersCount = await this.userService.getAllUsers();
    if (usersCount.length > 0) {
      this.logger.log('Seeding users action skipped');
      return;
    }

    this.logger.log('seeding users...');

    await this.userService.createBulkApiKeys(usersSeedData);

    this.logger.log('Seeding users done');
  }
}
