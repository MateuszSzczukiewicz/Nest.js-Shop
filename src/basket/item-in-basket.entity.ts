import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddItemDto } from './dto/add-item.dto';
import { ShopItem } from '../shop/shop-item.entity';
import { JoinColumn } from 'typeorm/browser';

@Entity()
export class ItemInBasket extends BaseEntity implements AddItemDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  count: number;

  @OneToOne((type) => ShopItem, (entity) => entity.itemInBasket)
  @JoinColumn()
  shopItem: ShopItem;
}
