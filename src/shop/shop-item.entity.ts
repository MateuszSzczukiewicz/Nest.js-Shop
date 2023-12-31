import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItemInterface } from '../interfaces/shop';
import { ItemInBasket } from '../basket/item-in-basket.entity';

@Entity()
export class ShopItem extends BaseEntity implements ShopItemInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 1000,
  })
  description: string;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2,
  })
  price: number;

  @OneToOne((type) => ItemInBasket, (entity) => entity.shopItem)
  itemInBasket: ItemInBasket;
}
