import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { Request } from 'express';
import { OauthService } from './oauth.service'
import { reduce } from 'rxjs';


@Controller('oauth')
export class OauthController {
  constructor (private readonly oauthService: OauthService) {}

  @Get('/callback')
  @Redirect()
  async callback(@Req() request: Request){
    const ghCode = String(request.query.code)
    const result: any = await this.oauthService.getJwtFromGh(ghCode)
    const checkIfUserExists = await this.oauthService.checkIfUserExists(result.data)
    const paresedToken = Object.fromEntries(new URLSearchParams(result.data));
    return {url: 'http://localhost:3000/oauth/callback?user=' + JSON.stringify({...checkIfUserExists, paresedToken}), code: 302}
  }
}
