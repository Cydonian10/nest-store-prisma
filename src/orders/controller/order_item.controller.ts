import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from "@nestjs/common";
import { respuesta } from "src/common/helpers";
import { CreateOrderItemDto, UpateOrderItemDto } from "../dtos/order-item.dto";
import { OrderItemService } from "../services/order_item.service";

@Controller("order-item")
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get("/:id")
  async findManyByOrder(@Param("id", ParseIntPipe) id: number) {
    const item = await this.orderItemService.findManybyOrder(id);
    return respuesta("Add Item", item);
  }

  @Post()
  async create(@Body() data: CreateOrderItemDto) {
    const newItem = await this.orderItemService.create(data);
    return respuesta("Add Item", newItem);
  }

  @Put("order/:orderId/product/:productId")
  async update(
    @Body() changes: UpateOrderItemDto,
    @Param("orderId", ParseIntPipe) orderId: number,
    @Param("productId", ParseIntPipe) productId: number
  ) {
    const updateItem = await this.orderItemService.update(changes, orderId, productId);
    return { updateItem };
  }

  @Delete("/:orderId/product/:productId")
  async delete(
    @Param("orderId", ParseIntPipe) orderId: number,
    @Param("productId", ParseIntPipe) productId: number
  ) {
    const deleteItem = await this.orderItemService.delete(orderId, productId);
    return deleteItem;
  }
}
