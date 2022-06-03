import * as Joi from "joi";

const validationSchema = Joi.object({
  API_KEY: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});

export default validationSchema;
