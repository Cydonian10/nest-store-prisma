import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { OrderService } from "src/orders/services/order.service";
import { JwtGuard } from "../guards/jwt.guard";
import { PayloadToken } from "../model/token.model";

@UseGuards(JwtGuard)
@Controller("profile")
export class ProfileController {
  constructor(private readonly orderService: OrderService) {}

  @Get("my-orders")
  async myOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    const orders = await this.orderService.orderByUser(user.sub);
    return {
      message: `All orderes de ${user.role}`,
      data: orders,
    };
  }
}
