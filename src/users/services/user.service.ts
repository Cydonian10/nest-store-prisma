import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/services/prisma.service";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany() {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { Customer: true },
    });

    if (!user) {
      throw new NotFoundException(`${id} not found`);
    }

    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = await this.prismaService.user.create({
      data: { email: data.email, password: data.password },
    });

    return newUser;
  }

  async delete(id: number) {
    const userRemove = await this.prismaService.user.delete({ where: { id } });

    return userRemove;
  }
}
