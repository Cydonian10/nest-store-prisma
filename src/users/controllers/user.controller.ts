import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from "@nestjs/common";
import { CreateUserDto } from "../dtos/user.dto";
import { UserService } from "../services/user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findMany();

    return {
      message: "All users",
      data: users,
    };
  }

  @Get("/:id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);

    return {
      message: "One user",
      data: user,
    };
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    console.log(user);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    await this.userService.delete(id);

    return {
      message: "delete",
    };
  }
}
