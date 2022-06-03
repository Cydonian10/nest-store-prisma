import { OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  readonly orderId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly productId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly quantity: number;
}

export class UpateOrderItemDto extends PartialType(
  OmitType(CreateOrderItemDto, ["orderId", "productId"])
) {}
