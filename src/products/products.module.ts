import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./dom/product.entity,ts";
import { ProductsController } from "./api/products.controller";
import { ProductsRepository } from "./inf/products.db.repo";
import { AddProductUseCase } from "./app/use-cases/add.product.uc";
import { ProductsQueryRepository } from "./inf/products.q.repo";
import { AddSmallProductImageUseCase } from "./app/use-cases/add.small.product.image.uc";
import { S3StorageAdapter } from "../application/files.storage.adapter";
import { GetProductsHandler } from "./app/queries/get.products.query";
import { AddHighProductImageUseCase } from "./app/use-cases/add.high.product.image.uc";

const productsUseCases = [AddProductUseCase, AddSmallProductImageUseCase,
  AddHighProductImageUseCase];
const productsQueries = [GetProductsHandler];
const productsAdapters = [ProductsRepository, ProductsQueryRepository];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [ProductsController],
  providers: [
    ...productsAdapters,
    ...productsUseCases,
    ...productsQueries,
    S3StorageAdapter
  ],
  exports: [...productsAdapters]
})

export class ProductsModule {
}