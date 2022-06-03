import { Module } from "@nestjs/common";
import { OrderController } from "./controller/order.controller";
import { OrderItemController } from "./controller/order_item.controller";
import { OrderItemService } from "./services/order_item.service";
import { OrderService } from "./services/order.service";

@Module({
  controllers: [OrderController, OrderItemController],
  providers: [OrderItemService, OrderService],
  exports: [OrderService],
})
export class OrdersModule {}
