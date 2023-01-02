import express from "express";
import {
  createCar,
  getAllCars,
  updateCarById,
  deleteCarById,
} from "../controllers/car.controllers";

const carRouter: express.Router = express.Router();

carRouter.get("/", getAllCars);

carRouter.post("/", createCar);

carRouter.put("/:id", updateCarById);

carRouter.delete("/:id", deleteCarById);

export default carRouter;
