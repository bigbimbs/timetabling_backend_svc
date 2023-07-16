import { Injectable } from '@nestjs/common/decorators';
import { VenueRepository } from './venue.repository';
import { ErrorHelper } from 'src/core/helpers';
import { ICreateVenue } from './venue.interface';
import { UserService } from 'src/app/user/user.service';
import { CreateVenueDto, EditVenueDto } from './venue.dto';

@Injectable()
export class VenueService {
  constructor(
    private readonly venueRepository: VenueRepository,
    private userService: UserService,
  ) {}

  async addVenue(createVenueDto: CreateVenueDto, apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    const data: ICreateVenue = {
      ...createVenueDto,
      user,
    };

    return this.venueRepository.saveVenue(data);
  }

  async editVenue(editVenueDto: EditVenueDto, apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    const venue = await this.venueRepository.findVenue(
      user.privateApiKey,
      editVenueDto.id,
    );
    if (!venue) {
      ErrorHelper.BadRequestException('No venue found');
    }
    return this.venueRepository.editVenue(editVenueDto);
  }

  async deleteVenue(venueId: string, apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    const venue = await this.venueRepository.findVenue(
      user.privateApiKey,
      venueId,
    );
    if (!venue) {
      ErrorHelper.BadRequestException('No venue found');
    }
    return this.venueRepository.deleteVenue(venue);
  }

  async getVenues(apiKey: string) {
    const user = await this.userService.validateUser(apiKey);
    if (user) {
      return this.venueRepository.getAllVenues(user.privateApiKey);
    }
  }
}
