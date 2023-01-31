"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carIdParamSchema = exports.createCarQuerySchema = exports.getAllCarsQuerySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.getAllCarsQuerySchema = joi_1.default.object({
    _id: joi_1.default.string().hex().length(24),
    page: joi_1.default.number().default(1),
    limit: joi_1.default.number().default(20),
    make: joi_1.default.string().uppercase().trim(),
    year: joi_1.default.number(),
    transmission_type: joi_1.default.string()
        .uppercase()
        .trim()
        .valid("MANUAL", "AUTOMATIC", "AUTOMATED_MANUAL", "DIRECT_DRIVE", "UNKNOWN"),
    size: joi_1.default.string().uppercase().trim().valid("COMPACT", "MIDSIZE", "LARGE"),
    style: joi_1.default.string().trim(),
    price: joi_1.default.number(),
});
exports.createCarQuerySchema = joi_1.default.object({
    _id: joi_1.default.string().hex().length(24),
    make: joi_1.default.string().uppercase().trim().required(),
    year: joi_1.default.number().min(1).max(2023).required(),
    transmission_type: joi_1.default.string()
        .uppercase()
        .trim()
        .valid("MANUAL", "AUTOMATIC", "AUTOMATED_MANUAL", "DIRECT_DRIVE", "UNKNOWN")
        .required(),
    size: joi_1.default.string()
        .uppercase()
        .trim()
        .valid("COMPACT", "MIDSIZE", "LARGE")
        .required(),
    style: joi_1.default.string().trim().required(),
    price: joi_1.default.number().min(1000).required(),
});
exports.carIdParamSchema = joi_1.default.object({
    id: joi_1.default.string().hex().length(24),
});
