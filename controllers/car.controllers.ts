import express from "express";
import Car from "../models/Car";
import createError from "http-errors";
import httpStatus from "http-status";
import {
  getAllCarsQuerySchema,
  createCarQuerySchema,
  carIdParamSchema,
} from "./car.validators";

// const transmissionTypes: Array<string> = [
//   "MANUAL",
//   "AUTOMATIC",
//   "AUTOMATED_MANUAL",
//   "DIRECT_DRIVE",
//   "UNKNOWN",
// ];

//Create a Car
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
    // const { make, year, transmission_type, size, style, price } = value;
    // console.log(value);

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

//Get all foo
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
    //mongoose query
    const { page, limit, ...filterValue } = value;

    // console.log(filterValue);

    let totalPages = 0;
    let listOfCars = [];

    // listOfCars = await Car.find().where("year").equals(2011).exec();
    listOfCars = await Car.find(filterValue);
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

//Update a foo
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

    //mongoose query
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
  } catch (err) {
    next(err);
  }
}

//Delete foo
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
    // console.log(findCar);
    if (!findCar) {
      throw createError(httpStatus.NOT_FOUND, "Car not exists!");
    }
    //mongoose query
    const target = await Car.findByIdAndDelete(id, { new: true });

    const responseData = {
      data: {
        message: "Delete Car Successfully!",
        car: target,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    // console.log(err);

    next(err);
  }
}
