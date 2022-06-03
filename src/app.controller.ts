import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { AppService } from "./app.service";
import { PareIntPipe } from "./common/pare-int.pipe";
import { CreateDataDto } from "./data.dto";

@Controller("pruebas")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("nuevo/:id/category/:categoryId")
  nuevoEnpont(@Param() objeto: any, @Param("id") id: string, @Param("categoryId") catId: string) {
    console.log(objeto);
    return { message: `product ${id} y category ${catId}` };
  }

  @Get("query")
  querysParams(@Query() todo: any, @Query("limit", PareIntPipe) limit: number) {
    return {
      limit,
    };
  }

  @Get("response")
  response(@Res() res: Response) {
    res.status(HttpStatus.ACCEPTED).json([]);
  }

  @Post("create")
  // @HttpCode(HttpStatus.CONFLICT)
  create(@Body() product: any) {
    console.log(product);
    return {
      message: "create",
    };
  }

  @Post()
  createProduct(@Body() product: CreateDataDto) {
    const productItem = this.appService.create(product);
    return productItem;
  }

  @Get(":id")
  findOne(@Param("id", PareIntPipe) id: number) {
    const productem = this.appService.findOne(id);
    return {
      productem,
    };
  }
}
