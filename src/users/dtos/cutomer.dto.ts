import { OmitType, PartialType } from "@nestjs/swagger";
import { Prisma, User } from "@prisma/client";
import { IsEmpty, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
  @IsString({ each: true, message: "No se admite numeros" })
  @IsNotEmpty()
  readonly name: string;

  @IsString({ each: true, message: "No se admite numeros" })
  @IsNotEmpty()
  readonly lastName: string;

  @IsNumber()
  @IsOptional()
  readonly userId?: number;
}

export class UpdateCustomerDto extends PartialType(OmitType(CreateCustomerDto, ["userId"])) {}
