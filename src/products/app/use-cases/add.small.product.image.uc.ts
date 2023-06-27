import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProductsRepository } from "../../inf/products.db.repo";
import { S3StorageAdapter } from "../../../application/files.storage.adapter";
import { makeErorrMessage } from "../../../application/make.error.message";
import sharp from "sharp";

export class AddSmallProductImageCommand {
  constructor(public id: string, public file: Express.Multer.File) {
  };
};

@CommandHandler(AddSmallProductImageCommand)
export class AddSmallProductImageUseCase
  implements ICommandHandler<AddSmallProductImageCommand> {
  constructor(
    protected productsRepository: ProductsRepository,
    private fileStorageAdapter: S3StorageAdapter
  ) {
  };

  async execute(command: AddSmallProductImageCommand) {
    const metadata = await this.validateImage(command.file);

    const product = await this.productsRepository.getProduct(command.id);
    if (!product) throw new NotFoundException();
    if (product.imgUrlSmall) return;

    const image = await this.fileStorageAdapter.saveProductImageSmall(
      product.id, command.file);
    if (!image) throw new NotFoundException();

    product.imgUrlSmall = image.url;

    const saveProduct = await this.productsRepository.saveProduct(product);
    if (!saveProduct) throw new NotFoundException();

    return process.env.STORAGE_URL + image.url;
  };

  async validateImage(image: any) {
    if (!image) throw new NotFoundException();

    const formats = ["image/jpeg", "image/jpg", "image/png"];

    if (!formats.includes(image.mimetype)) throw new BadRequestException(
      [{ message: makeErorrMessage("mimetype").message, field: "mimetype" }]);

    const errors = [];
    const metadata = await sharp(image.buffer).metadata();

    if (metadata.size > 1024 * 100) errors.push("size");
    if (metadata.width !== 325) errors.push("width");
    if (metadata.height !== 227) errors.push("height");

    if (errors.length !== 0) {
      const formatErr = errors.map(err =>
        ({ message: makeErorrMessage(err).message, field: err }));
      throw new BadRequestException(formatErr);
    }

    return metadata;
  };
};