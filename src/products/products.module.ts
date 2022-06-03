import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { ProductController } from './controllers/product.controller';

@Module({
  providers: [ProductService, CategoryService],
  controllers: [CategoryController, ProductController]
})
export class ProductsModule {}
