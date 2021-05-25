import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAliasDto } from './dto/create-alias.dto';
import { AliasService } from './alias.service';
import { Response } from 'express';
import { Res } from '@nestjs/common';

export const isValidUrl = (url) => {
  if (url.startsWith('http')) {
    try {
      new URL(url);

      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
};

@Controller('')
export class AliasController {
  constructor(private readonly service: AliasService) {}

  @Post('')
  async create(@Body() createAliasDto: CreateAliasDto) {
    try {
      if (isValidUrl(createAliasDto.fullUrl)) {
        return this.service.create(createAliasDto);
      }
      return { error: 'A fullUrl is required in your request body.' };
    } catch {
      return { error: 'A fullUrl is required in your request body.' };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res?: Response) {
    var response;

    if (id) {
      response = await this.service.findOne(id);
    }

    if (response?.fullUrl !== undefined && res !== undefined) {
      return res.redirect(response.fullUrl);
    }
    return { error: 'Not Found' };
  }
}
