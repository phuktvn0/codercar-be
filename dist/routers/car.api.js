"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const car_controllers_1 = require("../controllers/car.controllers");
const carRouter = express_1.default.Router();
carRouter.get("/", car_controllers_1.getAllCars);
carRouter.post("/", car_controllers_1.createCar);
carRouter.put("/:id", car_controllers_1.updateCarById);
carRouter.delete("/:id", car_controllers_1.deleteCarById);
exports.default = carRouter;
