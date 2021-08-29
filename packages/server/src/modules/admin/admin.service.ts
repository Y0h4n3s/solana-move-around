import { Injectable } from '@nestjs/common';
import * as DappLib from 'solana-move-around-dapplib';
///+api-admin-service-import

@Injectable()
export class AdminService {

  async sample(greeting: string): Promise<any> {
    return `API admin ${greeting}!`;
  }

///+api-admin-service

}
