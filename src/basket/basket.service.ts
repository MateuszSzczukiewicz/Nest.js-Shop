import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
  RemoveProductFromBasketResponse,
} from '../interfaces/basket';
import { ShopService } from '../shop/shop.service';

@Injectable({
  scope: Scope.REQUEST,
})
export class BasketService {
  private items: AddProductDto[] = [];

  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {}

  add(item: AddProductDto): AddProductToBasketResponse {
    const { name, count } = item;

    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      name === '' ||
      count < 1 ||
      !this.shopService.hasProduct(name)
    ) {
      return {
        isSuccess: false,
      };
    }

    this.items.push(item);

    return {
      isSuccess: true,
      index: this.items.length - 1,
    };
  }

  remove(index: number): RemoveProductFromBasketResponse {
    const { length, splice } = this.items;
    if (index < 0 || index >= length) {
      return {
        isSuccess: false,
      };
    }

    splice(index, 1);

    return {
      isSuccess: true,
    };
  }

  list(): ListProductsInBasketResponse {
    return this.items;
  }

  getTotalPrice(): GetTotalPriceResponse {
    if (this.items.every((item) => this.shopService.hasProduct(item.name))) {
      const alternativeBasket = this.items.filter((item) =>
        this.shopService.hasProduct(item.name),
      );

      return {
        isSuccess: false,
        alternativeBasket,
      };
    }
    return this.items
      .map(
        (item) => this.shopService.getPriceOfProduct(item.name) * item.count,
        23,
      )
      .reduce((prev, curr) => prev + curr, 0);
  }

  countPromo(): number {
    return this.getTotalPrice() > 10 ? 1 : 0;
  }
}
