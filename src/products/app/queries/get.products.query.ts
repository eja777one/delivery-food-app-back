import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { QueryType } from "../../../types";
import { ProductsQueryRepository } from "../../inf/products.q.repo";

export class GetProductsQuery {
  constructor(public query: QueryType) {
  };
};

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(
    private readonly productsQueryRepository: ProductsQueryRepository) {
  };

  async execute(query: GetProductsQuery) {
    const products = await this.productsQueryRepository
      .getProducts(query.query);
    return products;
  };
};