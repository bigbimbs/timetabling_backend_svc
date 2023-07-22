import { Body, Controller, Patch, Query, Get } from '@nestjs/common';

import { ConfigurationDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/configuration')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('')
  async addConfiguration(
    @Body() body: ConfigurationDto,
    @Query('key') apiKey: string,
  ) {
    const data = await this.userService.saveConfiguration(body, apiKey);

    return {
      data,
      message: 'Configuration saved successfully',
    };
  }

  @Get('')
  async getConfiguration(@Query('key') apiKey: string) {
    const data = await this.userService.getUserConfiguration(apiKey);

    return {
      data,
      message: 'Configuration fetched successfully',
    };
  }
}
