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

  @PrimaryGeneratedColumn()
  barcode: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  photo: string;

  @Column()
  original_price: string;

  @Column()
  selling_price: string;

  @Column()
  discount_price: string;

  @Column()
  avg_point: string;

  @Column()
  number_review: string;

  @Column()
  status: string;

  @Column()
  category_id: number;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
