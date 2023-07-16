import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto, DeleteVenueDto, EditVenueDto } from './venue.dto';

@Controller('/venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Post('')
  async addVenue(@Body() body: CreateVenueDto, @Query('key') apiKey: string) {
    const data = await this.venueService.addVenue(body, apiKey);

    return {
      data,
      message: 'Venue added successfully',
    };
  }

  @Get('')
  async getVenues(@Query('key') apiKey: string) {
    const data = await this.venueService.getVenues(apiKey);

    return {
      data,
      message: 'Venues fetched',
    };
  }

  @Patch('')
  async editVenues(@Body() body: EditVenueDto, @Query('key') apiKey: string) {
    const data = await this.venueService.editVenue(body, apiKey);

    return {
      data,
      message: 'Venue edited',
    };
  }

  @Delete('')
  async deleteVenue(
    @Body() body: DeleteVenueDto,
    @Query('key') apiKey: string,
  ) {
    const data = await this.venueService.deleteVenue(body.id, apiKey);

    return {
      data,
      message: 'Venue deleted',
    };
  }
}
