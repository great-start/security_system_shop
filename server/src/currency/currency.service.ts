import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getExchangeRate() {
    const { data } = await this.httpService.axiosRef.get(
      this.configService.get('EXCHANGE_RATE_URL'),
    );

    return data;
  }
}
