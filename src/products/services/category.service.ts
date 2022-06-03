import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/services/prisma.service";

import { CreateCategoryDto, UpateCategoryDto } from "../dtos/category";

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany() {
    const products = await this.prismaService.category.findMany();
    return products;
  }

  async findOne(id: number) {
    const product = await this.prismaService.category.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException(`${id} not found`);
    return product;
  }

  async create(data: CreateCategoryDto) {
    const product = await this.prismaService.category.create({
      data,
    });
    return product;
  }

  async update(changes: UpateCategoryDto, id: number) {
    await this.findOne(id);
    const updateProduct = await this.prismaService.category.update({
      data: changes,
      where: { id },
    });

    return updateProduct;
  }

  async delete(id: number) {
    await this.findOne(id);
    const rpta = await this.prismaService.category.delete({
      where: { id },
    });

    return rpta;
  }
}
