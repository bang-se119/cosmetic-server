import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  barcode: number;

  @Column()
  brand: string;

  @Column()
  name: string;

  @Column()
  short_name: string;

  @Column()
  description: string;

  @Column('varchar', { default: '' })
  photo: string;

  @Column()
  original_price: string;

  @Column()
  selling_price: string;

  @Column()
  discount_price: string;

  @Column('int', { default: 0 })
  avg_point: number;

  @Column('int', { default: 0 })
  number_review: number;

  @Column('varchar', { default: 'Out of stock' })
  status: string;

  @Column('int', { default: 0 })
  category_id: number;

  @Column('int', { default: 0 })
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
