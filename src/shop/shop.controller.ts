import { Controller, Get, Inject, Scope } from '@nestjs/common';
import { GetListOfProductsResponse } from '../interfaces/shop';
import { ShopService } from './shop.service';

@Controller({
  path: 'shop',
  scope: Scope.REQUEST,
})
export class ShopController {
  onApplicationBootstrap() {
    console.log('Załadowany!');
  }

  onApplicationShutdown() {
    console.log('Apka zaraz zniknie!');
  }

  constructor(@Inject('ShopService') private shopService: ShopService) {}

  @Get('/')
  getListOfProducts(): GetListOfProductsResponse {
    return this.shopService.getProducts();
  }
}
