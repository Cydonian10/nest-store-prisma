import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/services/prisma.service";
import { CreateOrderDto, UpateOrderDto } from "../dtos/order.dto";

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: number) {
    const order = await this.prismaService.order.findFirst({
      where: { id },
      include: { Order_Product: { include: { product: true } } },
    });

    if (!order) {
      throw new NotFoundException(`${id} not found`);
    }

    return order;
  }

  async create(data: CreateOrderDto) {
    const newOrder = await this.prismaService.order.create({
      data,
    });
    return newOrder;
  }

  async delete(id: number) {
    await this.findOne(id);
    const itemDelete = await this.prismaService.order.delete({
      where: { id },
    });

    return itemDelete;
  }
}
