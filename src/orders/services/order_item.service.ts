import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/services/prisma.service";
import { CreateOrderItemDto, UpateOrderItemDto } from "../dtos/order-item.dto";

@Injectable()
export class OrderItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManybyOrder(id: number) {
    const item = this.prismaService.order_Product.findMany({
      where: { orderId: id },
    });
    if (!item) {
      throw new NotFoundException(`${id} not found`);
    }
    return item;
  }

  async create(data: CreateOrderItemDto) {
    const newItem = await this.prismaService.order_Product.create({
      data: { quantity: data.quantity, orderId: data.orderId, productId: data.productId },
    });
    return newItem;
  }

  private async findOne(orderId: number, productId: number) {
    const item = await this.prismaService.order_Product.findUnique({
      where: { orderId_productId: { orderId: orderId, productId: productId } },
    });

    if (!item) {
      throw new NotFoundException(`Order ${orderId} with  productId ${productId} not found `);
    }

    return item;
  }

  async update(changes: UpateOrderItemDto, orderId: number, productId: number) {
    const item = await this.findOne(orderId, productId);

    const upateItem = await this.prismaService.order_Product.update({
      where: { orderId_productId: { orderId: orderId, productId: productId } },
      data: { ...item, ...changes },
    });

    return upateItem;
  }

  async delete(orderId: number, productId: number) {
    const deleteItem = await this.prismaService.order_Product.delete({
      where: { orderId_productId: { orderId: 1, productId: 1 } },
    });

    return deleteItem;
  }
}
