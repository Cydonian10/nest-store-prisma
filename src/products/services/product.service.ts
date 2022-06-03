import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";
import { CreateProductDto, FilterProductDto, UpdateProductDto } from "../dtos/product.dto";

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(querys?: FilterProductDto) {
    const { limit, offset, minPrice, maxPrice } = querys;
    const options: Prisma.ProductFindManyArgs = {};
    // const where: Prisma.ProductWhereInput = { price: { lte: 1, gt: 3 } };
    if (limit !== undefined && offset !== undefined) {
      options.skip = querys.offset;
      options.take = querys.limit;
    }
    if (minPrice && maxPrice) {
      options.where = {
        price: { lte: maxPrice, gt: minPrice },
      };
    }

    const products = await this.prismaService.product.findMany(options);
    return products;
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) throw new NotFoundException(`${id} not found`);
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = await this.prismaService.product.create({
      data: {
        ...data,
      },
    });

    return newProduct;
  }

  async update(changes: UpdateProductDto, id: number) {
    const { category, ...productAtrr } = await this.findOne(id);
    const product = await this.prismaService.product.update({
      data: { ...productAtrr, ...changes },
      where: { id },
    });
    return product;
  }

  async delete(id: number) {
    await this.findOne(id);
    const rpta = await this.prismaService.product.delete({
      where: { id },
    });

    return rpta;
  }
}
