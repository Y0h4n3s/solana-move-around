import { Injectable } from '@nestjs/common';
import * as DappLib from 'solana-move-around-dapplib';
///+api-service-import

@Injectable()
export class DappService {

  async sample(greeting: string): Promise<any> {
    return `API dapp ${greeting}!`;
  }

///+api-service

}
