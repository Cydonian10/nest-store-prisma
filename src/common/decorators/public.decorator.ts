import { SetMetadata } from "@nestjs/common";

export const Is_Public_Key = "isPublic";

export function Public() {
  return SetMetadata(Is_Public_Key, true);
}
