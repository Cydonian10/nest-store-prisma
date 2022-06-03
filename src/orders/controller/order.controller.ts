import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from "@nestjs/common";
import { respuesta } from "src/common/helpers";
import { CreateOrderDto } from "../dtos/order.dto";
import { OrderService } from "../services/order.service";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get("/:id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const order = await this.orderService.findOne(id);
    return respuesta("One Order", order);
  }

  @Post()
  async create(@Body() data: CreateOrderDto) {
    const newOrder = await this.orderService.create(data);
    return respuesta("Created Order", newOrder);
  }

  @Delete("/:id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    const itemDelete = await this.orderService.delete(id);
    return respuesta("Delete Item", itemDelete);
  }
}
