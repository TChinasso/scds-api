import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

import { Request } from 'express';


@Injectable()
export class OrgsService {
  constructor(private prisma: PrismaService, private httpService: HttpService) { }
  async getOrgs(req: Request): Promise<Object> {
    try {
      const gh_code = req.query.gh_token
      const { data: userFromGh } = await firstValueFrom(this.httpService.get('https://api.github.com/user', {
        headers: {
          Authorization: 'Bearer ' + gh_code,
          'X-GitHub-Api-Version': '2022-11-28',
        }
      }))
      let orgs = await firstValueFrom(this.httpService.get(`https://api.github.com/users/${userFromGh.login}/orgs`, {
        headers: {
          Authorization: 'Bearer ' + gh_code,
          'X-GitHub-Api-Version': '2022-11-28',
        }
      }))
      let repos = await firstValueFrom(this.httpService.get(orgs.data[0].repos_url, {
        headers: {
          Authorization: 'Bearer ' + gh_code,
          'X-GitHub-Api-Version': '2022-11-28',
        },
        params: {
          type: 'all'
        }
      }))
      return {orgs: {...orgs.data}, repos: {...repos.data}}
    } catch (err) {
      console.error(err);
      return err
    }
  }
  async getRepo(req: Request): Promise<Object> {
    try {
      const gh_code = req.query.gh_token
      const {url} = req.body.data.repo
      const { data: userFromGh } = await firstValueFrom(this.httpService.get('https://api.github.com/user', {
        headers: {
          Authorization: 'Bearer ' + gh_code,
          'X-GitHub-Api-Version': '2022-11-28',
        }
      }))
      let readme = await firstValueFrom(this.httpService.get(url + '/contents/README.md', {
        headers: {
          Authorization: 'Bearer ' + gh_code,
          'X-GitHub-Api-Version': '2022-11-28',
        }
      }))
      
      return {...readme.data}
    } catch (err) {
      console.error(err);
      return err
    }
  }

}
