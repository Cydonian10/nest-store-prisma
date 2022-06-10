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

  @Post("recovery")
  async sendEmailRecovery(@Body("email") email: string) {
    const rta = this.authService.sendRecovery(email);
    return rta;
  }

  @Post("change-password")
  async changePassword(@Body() data: { token: string; newPassword: string }) {
    const { token, newPassword } = data;
    console.log(data);
    const rpta = await this.authService.changePassword(token, newPassword);
    return rpta;
  }
}
