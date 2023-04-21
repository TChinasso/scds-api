import { Injectable } from '@nestjs/common';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

@Injectable()
export class AwsService {

  async getKeys() {
    const secret_name = "prod/gh/keys";

    const client = new SecretsManagerClient({
      region: "us-east-1",
    });

    let response: any;

    try {
      response = await client.send(
        new GetSecretValueCommand({
          SecretId: secret_name,
          VersionStage: "AWSCURRENT",
        })
      );
    } catch (error) {
      throw error;
    }
    return response.SecretString;
  }
}



