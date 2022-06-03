import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import validates from "./config/validateSchema";
import config from "./config/config";
import { enviroments } from "./config/enviroments";

import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";

import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

const api_key = process.env.DATABASE_URL;

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || ".env",
      isGlobal: true,
      load: [config],
      validationSchema: validates,
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService /** useClass */,
    {
      provide: "api_key",
      useValue: api_key,
    },
  ],
})
export class AppModule {}
