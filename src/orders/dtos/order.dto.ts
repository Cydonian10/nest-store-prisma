import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  readonly customerId: number;
}

export class UpateOrderDto extends PartialType(CreateOrderDto) {}
