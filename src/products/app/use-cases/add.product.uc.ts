import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { v4 as uuidv4 } from "uuid";
import { ProductsQueryRepository } from "../../inf/products.q.repo";
import { ProductsRepository } from "../../inf/products.db.repo";
import { Product } from "../../dom/product.entity,ts";
import { ProductInputModel } from "../../products.types";

export class AddProductCommand {
  constructor(public productInput: ProductInputModel) {
  };
};

@CommandHandler(AddProductCommand)
export class AddProductUseCase implements ICommandHandler<AddProductCommand> {
  constructor(
    protected productsQueryRepository: ProductsQueryRepository,
    protected productsRepository: ProductsRepository
  ) {
  };

  async execute(command: AddProductCommand) {
    const isProductExists = await this.productsRepository
      .getProductByName(command.productInput.name);

    if (isProductExists) return;

    const productId = uuidv4();

    const product = new Product();
    product.id = productId;
    product.name = command.productInput.name;
    product.description = command.productInput.description;
    product.composition = command.productInput.composition;
    product.category = command.productInput.category;
    product.weight = command.productInput.weight;
    product.price = command.productInput.price;
    product.proteins = command.productInput.proteins;
    product.fats = command.productInput.fats;
    product.carbohydrates = command.productInput.carbohydrates;
    product.kilocalories = command.productInput.kilocalories;

    const saveProduct = await this.productsRepository.saveProduct(product);
    if (!saveProduct) throw new NotFoundException();

    const newProduct = await this.productsQueryRepository.getProduct(productId);
    if (!newProduct) throw new NotFoundException();

    return newProduct;
  };
};