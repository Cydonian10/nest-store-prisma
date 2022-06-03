import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  Query,
} from "@nestjs/common";
import { respuesta } from "src/common/helpers";
import { CreateProductDto, FilterProductDto, UpdateProductDto } from "../dtos/product.dto";
import { ProductService } from "../services/product.service";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query() querys: FilterProductDto) {
    const products = await this.productService.findMany(querys);
    return respuesta("All products", products);
  }

  @Get("/:id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const product = await this.productService.findOne(id);
    return respuesta("All products", product);
  }

  @Post()
  async create(@Body() data: CreateProductDto) {
    const product = await this.productService.create(data);
    return respuesta("Created products", product);
  }

  @Put("/:id")
  async update(@Body() changes: UpdateProductDto, @Param("id", ParseIntPipe) id: number) {
    const product = await this.productService.update(changes, id);
    return respuesta("Created products", product);
  }

  @Delete("/:id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    const product = await this.productService.delete(id);
    return respuesta("All products", product);
  }
}
