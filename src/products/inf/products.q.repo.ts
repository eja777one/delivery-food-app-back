import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { errorHandler } from "../../application/error.hadler";
import { ProductViewModel } from "../products.types";
import { Product } from "../dom/product.entity,ts";
import { QueryType } from "../../types";

@Injectable()
export class ProductsQueryRepository {
  constructor(@InjectDataSource() private dataSource: DataSource) {
  };

  async getProducts(query: QueryType): Promise<ProductViewModel[]> {
    try {
      let products = await this.dataSource
        .getRepository(Product)
        .createQueryBuilder("p")
        .where("p.available = true")
        .getMany();

      if (query?.category) {
        products = products.filter(el => el.category === query.category);
      }

      return products.map(el => formatProduct(el));
    } catch (e) {
      return errorHandler(e);
    }
  };

  async getProduct(id: string): Promise<ProductViewModel> {
    try {
      const product = await this.dataSource
        .getRepository(Product)
        .createQueryBuilder("p")
        .where("p.available = true AND p.id = :id", { id })
        .getOne();
      console.log(product);
      return product;
    } catch (e) {
      return errorHandler(e);
    }
  };
};

const formatProduct = (product: any) => {
  return {
    ...product,
    imgUrl: process.env.STORAGE_URL + product.imgUrl
  };
};