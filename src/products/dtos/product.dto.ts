import { PartialType } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @IsPositive()
  @IsNumber()
  readonly price: number;

  @IsPositive()
  @IsNotEmpty()
  readonly categoryId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @Min(1)
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @ValidateIf((item) => item.maxPrice)
  @IsPositive()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}
