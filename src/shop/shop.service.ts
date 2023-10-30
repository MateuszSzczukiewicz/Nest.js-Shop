import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  GetListOfProductsResponse,
  GetPaginatedListOfProductsResponse,
} from '../interfaces/shop';
import { BasketService } from '../basket/basket.service';
import { ShopItem } from './shop-item.entity';
import { Like } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}

  async getProducts(
    currentPage: number = 1,
  ): Promise<GetPaginatedListOfProductsResponse> {
    const maxPerPage = 3;

    const [items, count] = await ShopItem.findAndCount({
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const pagesCount = Math.ceil(count / maxPerPage);

    return {
      items,
      pagesCount,
    };
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).items.some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).items.find((item) => item.name === name)
      .price;
  }

  async getOneProduct(id: string): Promise<ShopItem> {
    return ShopItem.findOneOrFail(id);
  }

  async removeProduct(id: string) {
    await ShopItem.delete(id);
  }

  async createProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.name = 'test';
    newItem.price = 10;
    newItem.description = 'test';

    await newItem.save();

    return newItem;
  }

  async addBoughtCounter(id: string) {
    await ShopItem.update(id, {
      wasEverBought: true,
    });

    const item = await ShopItem.findOneOrFail(id);

    item.boughtCounter++;

    await item.save();
  }

  async findProducts(searchTerm: string): Promise<GetListOfProductsResponse> {
    return await ShopItem.find({
      where: {
        description: Like(`%${searchTerm}%`),
      },
    });
  }
}
