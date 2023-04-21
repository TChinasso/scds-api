import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { OauthController } from './oauth/oauth.controller';
import { HttpModule } from '@nestjs/axios'
import { OauthService } from './oauth/oauth.service';
import { OrgsService } from './orgs/orgs.service';
import { OrgsController } from './orgs/orgs.controller';
import { AwsService } from './aws/aws.service';

@Module({
  imports: [HttpModule],
  controllers: [OauthController, OrgsController],
  providers: [PrismaService, OauthService, OrgsService, AwsService],
})
export class AppModule {}
