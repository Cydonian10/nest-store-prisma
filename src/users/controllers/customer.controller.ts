import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from "@nestjs/common";
import { Customer } from "@prisma/client";
import { respuesta } from "src/common/helpers";
import { CreateCustomerDto, UpdateCustomerDto } from "../dtos/cutomer.dto";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { CustomerService } from "../services/customer.service";

@Controller("customer")
export class CustomerController {
  constructor(private readonly cutomerService: CustomerService) {}

  @Get()
  async findAll() {
    const customers = await this.cutomerService.findMany();
    return respuesta<Customer[]>("All customer", customers);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const customer = await this.cutomerService.findOne(id);
    return respuesta("One Customer", customer);
  }

  @Post()
  async create(@Body("customer") customer: CreateCustomerDto, @Body("user") user: CreateUserDto) {
    const newCustomer = await this.cutomerService.create(customer, user);
    return respuesta("Created customer", newCustomer);
  }

  @Put(":id")
  async update(
    @Body("customer") customer: UpdateCustomerDto,
    @Body("user") user: UpdateUserDto,
    @Param("id", ParseIntPipe) id: number
  ) {
    const customerUpdate = await this.cutomerService.update(customer, user, id);
    return respuesta("Update Customer", customerUpdate);
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    const customerremove = await this.cutomerService.delete(id);
    return respuesta("Delete Customer", customerremove);
  }
}
