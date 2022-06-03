import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Request } from "express";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("localStrategy"))
  @Post("login")
  async login(@Req() req: Request) {
    const user = await this.authService.generateJWT(req.user as User);
    return user;
  }

  @Post("refresh")
  async refreshToken(@Body() token: { token: string }) {
    return this.authService.refreshToken(token.token);
  }
}
