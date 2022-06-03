import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDataDto {
  @IsString({ message: "Name is string" })
  @IsNotEmpty()
  readonly name: number;
}

export class UpdateDataDto extends PartialType(CreateDataDto) {}
