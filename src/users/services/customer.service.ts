import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Customer, Prisma } from "@prisma/client";

import { PrismaService } from "src/prisma/services/prisma.service";
import { CreateCustomerDto, UpdateCustomerDto } from "../dtos/cutomer.dto";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany() {
    const customers = await this.prismaService.customer.findMany();
    return customers;
  }

  async findOne(id: number) {
    const customer = await this.prismaService.customer.findFirst({
      where: { id },
      include: { user: true, Order: true },
    });

    if (!customer) {
      throw new NotFoundException(`El id ${id} no fue encontrado`);
    }

    return customer;
  }

  async findEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async create(customerData: CreateCustomerDto, userData: CreateUserDto) {
    const user = await this.findEmail(userData.email);

    if (user) {
      throw new BadRequestException("Ya existe el email");
    }

    const newCustomer = await this.prismaService.customer.create({
      data: {
        lastName: customerData.lastName,
        name: customerData.name,
        user: {
          create: {
            email: userData.email,
            password: userData.password,
          },
        },
      },
    });

    return newCustomer;
  }

  async update(changesCustomer: UpdateCustomerDto, changesUser: UpdateUserDto, id: number) {
    let rpta = await this.findOne(id);
    let { user, ...customer } = rpta;
    let { Order, ...c } = customer;

    if (changesCustomer) {
      rpta = await this.prismaService.customer.update({
        data: { ...c, name: changesCustomer.name, lastName: changesCustomer.lastName },
        where: { id },
        include: { user: true, Order: true },
      });
    }

    if (changesUser) {
      await this.prismaService.user.update({
        data: { ...user, email: changesUser.email, password: changesUser.password },
        where: { id: customer.userId },
      });
    }
    delete rpta.userId;
    return rpta;
  }

  async delete(id: number) {
    const { user, ...customer } = await this.findOne(id);

    const rpta = await this.prismaService.customer.delete({
      where: { id },
    });

    return rpta;
  }
}
