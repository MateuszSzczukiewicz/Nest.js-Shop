import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ShopItem } from './shop-item.entity';

@Entity()
export class ShopItemDetails {
  @Column({
    length: 15,
  })
  color: string;

  @Column()
  width: number;

  @OneToOne((type) => ShopItem)
  shopItem: ShopItem;

  @ManyToOne((type) => ShopItem, (entity) => entity.subShopItems)
  mainShopItem: ShopItem;

  @OneToMany((type) => ShopItem, (entity) => entity.mainShopItem)
  subShopItems: ShopItem[];
}
