import { SetMetadata } from "@nestjs/common";
import { Rol } from "src/users/dtos/user.dto";

export const Roles_key = "roles";

export function Roles(role: Rol) {
  return SetMetadata(Roles_key, role);
}
