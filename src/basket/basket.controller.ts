import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import { BasketService } from './basket.service';
import {
  AddToBasketResponse,
  GetBasketResponse,
  GetTotalBasketPriceResponse,
  RemoveFromBasketResponse,
} from '../interfaces/basket';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Post('/')
  addProductToBasket(@Body() item: AddItemDto): Promise<AddToBasketResponse> {
    return this.basketService.add(item);
  }

  @Delete('/:index')
  removeProduct(@Param('index') index: string): RemoveFromBasketResponse {
    return this.basketService.remove(Number(index));
  }

  @Get('/')
  listProductsInBasket(): GetBasketResponse {
    return this.basketService.getAll();
  }

  @Get('/total-price')
  getTotalBasketPrice(): Promise<GetTotalBasketPriceResponse> {
    return this.basketService.getTotalPrice();
  }
}
