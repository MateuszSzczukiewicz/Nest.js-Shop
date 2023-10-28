import { Injectable } from '@nestjs/common';
import { GetListOfProductsResponse } from '../interfaces/shop';

@Injectable()
export class ShopService {
  getProducts(): GetListOfProductsResponse {
    return [
      {
        name: 'Ogórki kiszone',
        description: 'Bardzo dobre ogórki',
        price: 4,
      },
      {
        name: 'Super ogórki',
        description: 'Jeszcze lepsze ogórki',
        price: 6,
      },
      {
        name: 'Ogórki afrykańskie',
        description: 'Ogórki z dalekich krain',
        price: 5,
      },
    ];
  }

  hasProduct(name: string): boolean {
    return this.getProducts().some((item) => item.name === name);
  }

  getPriceOfProduct(name: string): number {
    return this.getProducts().find((item) => item.name === name).price;
  }
}
