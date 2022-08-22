export interface IExchangeRate {
  [index: number]: {
    ccy: string;
    base_ccy: string;
    buy: string;
    sale: string;
  };
}
