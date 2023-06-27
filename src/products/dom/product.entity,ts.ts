import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("character varying", { nullable: false })
  name: string;

  @Column("character varying", { nullable: false })
  description: string;

  @Column("character varying", { nullable: true })
  composition: string;

  @Column("character varying", { nullable: true })
  imgUrlSmall: string;

  @Column("character varying", { nullable: true })
  imgUrlHigh: string;

  @Column("character varying", { nullable: false })
  category: string;

  @Column("integer", { nullable: false })
  weight: number;

  @Column("integer", { nullable: false })
  price: number;

  @Column("float", { nullable: false })
  proteins: number;

  @Column("float", { nullable: false })
  fats: number;

  @Column("float", { nullable: false })
  carbohydrates: number;

  @Column("integer", { nullable: false })
  kilocalories: number;

  @Column("boolean", { nullable: false, default: true })
  available: boolean;
};