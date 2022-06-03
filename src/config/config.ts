import { registerAs } from "@nestjs/config";

export default registerAs("config", () => {
  // 👈 export default
  return {
    apiKey: process.env.API_KEY,
  };
});
