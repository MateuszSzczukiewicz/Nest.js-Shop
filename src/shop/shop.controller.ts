import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Scope,
} from '@nestjs/common';
import {
  CreateNewProductResponse,
  GetListOfProductsResponse,
  GetOneProductResponse,
  GetPaginatedListOfProductsResponse,
} from '../interfaces/shop';
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
  getListOfProducts(): Promise<GetPaginatedListOfProductsResponse> {
    return this.shopService.getProducts();
  }

  @Get('/')
  findItem(
    @Param('searchTerm') searchTerm: string,
  ): Promise<GetListOfProductsResponse> {
    return this.shopService.findProducts();
  }

  @Get('/:id')
  getOneProduct(@Param('id') id: string): Promise<GetOneProductResponse> {
    return this.shopService.getOneProduct(id);
  }

  @Delete('/:id')
  removeProduct(@Param('id') id: string) {
    this.shopService.removeProduct(id);
  }

  @Post('/')
  createNewProduct(): Promise<CreateNewProductResponse> {
    return this.shopService.createProduct();
  }
}
