import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Body } from "@nestjs/common";
import { respuesta } from "src/common/helpers";
import { CreateCategoryDto } from "../dtos/category";
import { CategoryService } from "../services/category.service";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    const categories = await this.categoryService.findMany();
    return respuesta("All categories", categories);
  }

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
