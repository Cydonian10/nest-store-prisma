import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Is_Public_Key } from "src/common/decorators/public.decorator";
import config from "src/config/config";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private refletor: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const isPublic = this.refletor.get(
      Is_Public_Key,
      context.getHandler() /** function asignada en el controlador*/
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers["auth"];

    if (authHeader === this.configService.apiKey) {
      return true;
    }
    throw new UnauthorizedException("not allow");
  }
}
