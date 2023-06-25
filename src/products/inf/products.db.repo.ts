import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Product } from "../dom/product.entity,ts";
import { errorHandler } from "../../application/error.hadler";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>
  ) {
  };

  async getProductByName(name: string) {
    try {
      const product = await this.productRepo.findOneBy({ name });
      return product;
    } catch (e) {
      return errorHandler(e);
    }
  };

  async getProduct(id: string) {
    try {
      const product = await this.productRepo.findOneBy({ id });
      return product;
    } catch (e) {
      return errorHandler(e);
    }
  };

  async saveProduct(product: Product) {
    try {
      await this.productRepo.save(product);
      return true;
    } catch (e) {
      return errorHandler(e);
    }
  };
};