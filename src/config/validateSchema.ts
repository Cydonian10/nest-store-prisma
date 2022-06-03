import * as Joi from "joi";

const validationSchema = Joi.object({
  API_KEY: Joi.string().required(),
});

export default validationSchema;
