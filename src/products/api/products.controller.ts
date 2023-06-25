import {
  Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UploadedFile,
  UseGuards, UseInterceptors
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { QueryType } from "../../types";
import { ApiTags } from "@nestjs/swagger";
import { BasicAuthGuard } from "../../pipes&valid/basic.auth.guard.pipe";
import { ProductInputModel, ProductViewModel } from "../products.types";
import { AddProductCommand } from "../app/use-cases/add.product.uc";
import { FileInterceptor } from "@nestjs/platform-express";
import { AddProductImageCommand } from "../app/use-cases/add.product.image.uc";
import { GetProductsQuery } from "../app/queries/get.products.query";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
  };

  @UseGuards(BasicAuthGuard)
  @Post()
  // @ApiBearerAuth()
  // @ApiOperation(sw_subscribeToBlog.summary)
  // @ApiResponse(sw_subscribeToBlog.status204)
  // @ApiResponse(sw_subscribeToBlog.status401)
  // @ApiResponse(sw_subscribeToBlog.status404)
  async addProduct(@Body() productInput: ProductInputModel)
    : Promise<ProductViewModel> {
    const product = await this.commandBus.execute(
      new AddProductCommand(productInput));
    return product;
  };

  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(FileInterceptor("file"))
  @Post(":id/image")
  // @ApiBearerAuth()
  // @ApiOperation(sw_subscribeToBlog.summary)
  // @ApiResponse(sw_subscribeToBlog.status204)
  // @ApiResponse(sw_subscribeToBlog.status401)
  // @ApiResponse(sw_subscribeToBlog.status404)
  async addProductImage(@UploadedFile() file: Express.Multer.File,
                        @Param("id") id: string) {
    await this.commandBus.execute(new AddProductImageCommand(id, file));
  };

  @Get()
  // @ApiImplicitQuery(sw_getBlogs.searchNameTerm)
  // @ApiImplicitQuery(sw_getBlogs.sortBy)
  // @ApiImplicitQuery(sw_getBlogs.sortDirection)
  // @ApiImplicitQuery(sw_getBlogs.pageNumber)
  // @ApiImplicitQuery(sw_getBlogs.pageSize)
  // @ApiOperation(sw_getBlogs.summary)
  // @ApiResponse(sw_getBlogs.status200)
  async getProducts(@Query() query: QueryType): Promise<ProductViewModel[]> {
    const products = await this.queryBus.execute(new GetProductsQuery(query));
    return products;
  };
};