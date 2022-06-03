import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class AppService {
  private counterId = 1;
  private products: any[] = [
    {
      id: 1,
      name: "product one",
    },
  ];

  constructor(@Inject("api_key") private apiKey: string) {}

  getHello(): string {
    return "Hello World!" + this.apiKey;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  create(data: any) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      name: data.name,
    };
    this.products.push(newProduct);
    return newProduct;
  }
}
