import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { RolGuard } from "src/auth/guards/rol.guard";
import { Public } from "src/common/decorators/public.decorator";
import { Roles } from "src/common/decorators/rol.decorator";

import { respuesta } from "src/common/helpers";
import { Rol } from "src/users/dtos/user.dto";
import { CreateCategoryDto } from "../dtos/category";
import { CategoryService } from "../services/category.service";

// @UseGuards(ApiKeyGuard)
@UseGuards(JwtGuard, RolGuard)
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Rol.customer)
  @Get()
  // @Public()
  async findAll() {
    const categories = await this.categoryService.findMany();
    return respuesta("All categories", categories);
  }

  @Public()
  @Get("/:id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const category = await this.categoryService.findOne(id);
    return respuesta("One category", category);
  }

  @Post()
  async create(@Body() category: CreateCategoryDto) {
    const newCategory = await this.categoryService.create(category);
    return respuesta("Created category", newCategory);
  }

  @Put("/:id")
  async update(@Body() changes: CreateCategoryDto, @Param("id", ParseIntPipe) id: number) {
    const category = await this.categoryService.update(changes, id);
    return respuesta("update category", category);
  }

  @Delete("/:id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    const category = await this.categoryService.delete(id);
    return respuesta("update category", category);
  }
}
