import { hash, compare } from "bcrypt";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/users/services/user.service";
import { User } from "@prisma/client";
import { PayloadToken } from "../model/token.model";
import { PrismaService } from "src/prisma/services/prisma.service";
const nodemailer = require("nodemailer");

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {}

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

  async sendRecovery(email: string) {
    const user = await this.userService.findEmail(email);
    if (!user) {
      throw new NotFoundException(`${email} not found`);
    }
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: "15min" });
    const link = `http://myfrotend.com/recovery?token=${token}`;

    await this.userService.update({ recoveryToken: token }, user.id);

    const mail = {
      from: `"Fred Foo 👻" zudex85@gmail.com`, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Email para recuperar la contraseña ✔", // Subject line
      html: `<b>Ingresa este link para cambiar la contraseña => ${link}</b>`, // html body
    };

    const rtap = await this.sendEmai(mail);
    return rtap;
  }

  async sendEmai(infoMail: any) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: "zudex85@gmail.com", // generated ethereal user
        pass: "huxhodxstgtegira", // generated ethereal password
      },
    });

    await transporter.sendMail(infoMail);

    return { message: "send email" };
  }

  async changePassword(token: string, password: string) {
    try {
      const payload = this.jwtService.verify(token);
      const id = parseInt(payload.sub, 10);
      const user = await this.prismaService.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundException(`not found`);
      if (user.recoveryToken !== token) throw new UnauthorizedException();

      const hashPassword = await hash(password, 5);
      await this.userService.update({ recoveryToken: null, password: hashPassword }, user.id);

      return { message: "password change" };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  //huxhodxstgtegira
}
