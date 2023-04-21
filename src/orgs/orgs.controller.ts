import { Controller, Get, Post, Req } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { Request } from 'express';


@Controller('orgs')
export class OrgsController {
  constructor (private readonly oauthService: OrgsService) {}

  @Get()
  async getOrgs(@Req() request: Request){
    const orgs = await this.oauthService.getOrgs(request)
    return orgs
  }

  @Post('/repo')
  async getRepo(@Req() request: Request) {
    const repo = await this.oauthService.getRepo(request)
    return repo
  }
}
