import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/services/user.service";
import { compare } from "bcrypt";
import { User } from "@prisma/client";
import { PayloadToken } from "../model/token.model";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async valideteUser(email: string, password: string) {
    const user = await this.userService.findEmail(email);
    const isMatch = await compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async generateJWT(user: User) {
    const payload: PayloadToken = { role: user.rol, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async refreshToken(token: string) {
    const usuario = (await this.jwtService.decode(token)) as any;

    const payload: PayloadToken = { sub: usuario.sub, role: usuario.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
