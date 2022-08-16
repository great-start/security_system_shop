import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('exchange-rate')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/')
  getExchangeRate() {
    return this.currencyService.getExchangeRate();
  }
}
