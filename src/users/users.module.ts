import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController, CustomerController],
  providers: [CustomerService, UserService]
})
export class UsersModule {}
