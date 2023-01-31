import express from "express";
import Car from "../models/Car";
import createError from "http-errors";
import httpStatus from "http-status";
import {
  getAllCarsQuerySchema,
  createCarQuerySchema,
  carIdParamSchema,
} from "./car.validators";

export async function createCar(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { error, value } = createCarQuerySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const created = await Car.create(value);
    const responseData = {
      data: {
        message: "Create Car Successfully!",
        car: created,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}

export async function getAllCars(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { error, value } = getAllCarsQuerySchema.validate(req.query, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const { page, limit, ...filterValue } = value;

    let totalPages = 0;
    let listOfCars = [];

    listOfCars = await Car.find(filterValue);
    if (listOfCars.length === 0) {
      throw createError(httpStatus.NOT_FOUND, "Car not found!");
    }
    totalPages = Math.ceil(listOfCars.length / limit);

    const offset: number = limit * (page - 1);
    listOfCars = listOfCars.slice(offset, offset + limit);

    const responseData = {
      data: {
        message: "Get Car List Successfully!",
        cars: listOfCars,
        page: page,
        total: totalPages,
      },
    };

    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}

export async function updateCarById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { id } = req.params;

    const { error, value } = createCarQuerySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const findCar = await Car.findById(id);
    if (!findCar) {
      throw createError(httpStatus.NOT_FOUND, "Car not found!");
    } else {
      const updated = await Car.findByIdAndUpdate(id, value, {
        new: true,
      });
      const responseData = {
        data: {
          message: "Update Car Successfully!",
          car: updated,
        },
      };
      res.status(200).send(responseData);
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteCarById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { error, value } = carIdParamSchema.validate(req.params);
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const { id } = value;

    const findCar = await Car.findById(id);
    if (!findCar) {
      throw createError(httpStatus.NOT_FOUND, "Car not exists!");
    }
    const target = await Car.findByIdAndDelete(id, { new: true });

    const responseData = {
      data: {
        message: "Delete Car Successfully!",
        car: target,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}
