import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import {
  AddToBasketResponse,
  GetTotalBasketPriceResponse,
  RemoveFromBasketResponse,
} from '../interfaces/basket';
import { ShopService } from '../shop/shop.service';
import { ItemInBasket } from './item-in-basket.entity';
import { AddItemDto } from './dto/add-item.dto';
import { ShopItem } from '../shop/shop-item.entity';

@Injectable({
  scope: Scope.REQUEST,
})
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {}

  async add(product: AddItemDto): Promise<AddToBasketResponse> {
    const { id, count } = product;

    const shopItem = await ShopItem.getOneItem(id);

    if (
      typeof id !== 'string' ||
      typeof count !== 'number' ||
      id === '' ||
      count < 1 ||
      !shopItem
    ) {
      return {
        isSuccess: false,
      };
    }

    const item = new ItemInBasket();
    item.count = count;

    await item.save();

    await item.save();

    return {
      isSuccess: true,
      id: item.id,
    };
  }

  async remove(id: string): Promise<RemoveFromBasketResponse> {
    const item = await ItemInBasket.findOne(id);

    if (item) {
      await item.remove();

      return {
        isSuccess: true,
      };
    }

    return {
      isSuccess: false,
    };
  }

  async getAll(): Promise<ItemInBasket[]> {
    return ItemInBasket.find({
      relations: ['shopItem'],
    });
  }

  async clearBasket() {
    await ItemInBasket.delete({});
  }

  async getTotalPrice(): Promise<GetTotalBasketPriceResponse> {
    const items = await this.getAll();

    return (
      await Promise.all(
        items.map(
          async (item) =>
            (await this.shopService.getPrice(item.id)) * item.count * 1.23,
        ),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }
}
