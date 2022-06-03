import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Roles_key } from "src/common/decorators/rol.decorator";
import { PayloadToken } from "../model/token.model";

@Injectable()
export class RolGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const role = this.reflector.get(Roles_key, context.getHandler());
    if (!role) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as PayloadToken;
    const isAuth = user.role === role;

    if (!isAuth) {
      throw new ForbiddenException("no teiene acceso");
    }
    return true;
  }
}
