import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { PrismaService } from 'src/database/prisma.service';
import { gh_user, user  } from '@prisma/client';
import { AwsService } from 'src/aws/aws.service';


@Injectable()
export class OauthService {
  constructor(private prisma: PrismaService, private httpService: HttpService, private aws: AwsService) {}
  

  async getJwtFromGh(code: string): Promise<AxiosResponse>{
    const secrets = JSON.parse(await this.aws.getKeys())
    return await firstValueFrom(this.httpService.post('https://github.com/login/oauth/access_token', {
      client_id: secrets.GH_CLIENT_ID,
      client_secret: secrets.GH_CLIENT_SECRET,
      code: code,
      accept: 'json'
    }))
  }

  async checkIfUserExists(token: string){
    const paresedToken = Object.fromEntries(new URLSearchParams(token));
    const {data: userFromGh} = await firstValueFrom(this.httpService.get('https://api.github.com/user', {
      headers:{
        Authorization: 'Bearer ' + paresedToken.access_token,
        'X-GitHub-Api-Version': '2022-11-28',
      }
    }))
    
    const ghUserFromDb = await this.prisma.gh_user.findUnique({ where: {
      id: userFromGh.id
    }})

    if (!ghUserFromDb) {
      const user = await this.createUser(userFromGh)
      const createdGhUserOnDb = await this.createGhUser(userFromGh, user)
      return createdGhUserOnDb
    } else { 
      return ghUserFromDb
    }
  }
  
  async createGhUser(userFromGh: any, user: user): Promise<gh_user>{
    const payload = {
      id: userFromGh.id,
      email: userFromGh.email,
      location: userFromGh.location,
      login: userFromGh.login,
      name: userFromGh.name,
      profile_picture: userFromGh.avatar_url,
      user_id: user.id,
    }
    const result = await this.prisma.gh_user.create({data: payload})
    return result
  }
  async createUser(userFromGh: any): Promise<user>{
    const payload = {
      email: userFromGh.email ?? '',
      login: userFromGh.login,
      name: userFromGh.name,
      password: ''
    }
    const result = await this.prisma.user.create({data: payload})
    return result
  }


}
