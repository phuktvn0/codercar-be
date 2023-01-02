import Joi from "joi";

export const getAllCarsQuerySchema = Joi.object({
  page: Joi.number().default(1),
  limit: Joi.number().default(20),
  make: Joi.string().uppercase().trim(),
  year: Joi.number(),
  transmission_type: Joi.string()
    .uppercase()
    .trim()
    .valid(
      "MANUAL",
      "AUTOMATIC",
      "AUTOMATED_MANUAL",
      "DIRECT_DRIVE",
      "UNKNOWN"
    ),
  size: Joi.string().uppercase().trim().valid("COMPACT", "MIDSIZE", "LARGE"),
  style: Joi.string().trim(),
  price: Joi.number(),
});

export const createCarQuerySchema = Joi.object({
  make: Joi.string().uppercase().trim().required(),
  year: Joi.number().min(1).max(2023).required(),
  transmission_type: Joi.string()
    .uppercase()
    .trim()
    .valid("MANUAL", "AUTOMATIC", "AUTOMATED_MANUAL", "DIRECT_DRIVE", "UNKNOWN")
    .required(),
  size: Joi.string()
    .uppercase()
    .trim()
    .valid("COMPACT", "MIDSIZE", "LARGE")
    .required(),
  style: Joi.string().trim().required(),
  price: Joi.number().min(1000).required(),
});

export const carIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24),
});
