import { Injectable, CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Is_Public_Key } from "src/common/decorators/public.decorator";
import config from "src/config/config";

@Injectable()
export class JwtGuard extends AuthGuard("jwtStrategy") {
  constructor(
    private refletor: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.refletor.get(
      Is_Public_Key,
      context.getHandler() /** function asignada en el controlador*/
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
