"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    make: { type: String, required: true },
    year: { type: Number, required: true },
    transmission_type: { type: String, required: true },
    size: { type: String, required: true },
    style: { type: String, required: true },
    price: { type: Number, required: true },
}, {
    timestamps: true,
});
const Car = (0, mongoose_1.model)("Car", carSchema);
exports.default = Car;
