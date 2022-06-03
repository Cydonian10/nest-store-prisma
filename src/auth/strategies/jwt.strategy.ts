import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PayloadToken } from "../model/token.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwtStrategy") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: PayloadToken): Promise<PayloadToken> {
    return { sub: payload.sub, role: payload.role };
  }
}
