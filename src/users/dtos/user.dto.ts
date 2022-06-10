import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

import { EnumToString } from "src/common/helpers";

export enum Rol {
  admin = "admin",
  customer = "customer",
  seller = "seller",
}

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsEnum(Rol, { message: `Rol Opcion invalida , las opciones validas son ${EnumToString(Rol)}` })
  @IsOptional()
  readonly rol: Rol;

  @IsOptional()
  recoveryToken: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
