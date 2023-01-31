// Importing module
import express from "express";
import carRouter from "./routers/car.api";

import cors from "cors";
import createError from "http-errors";
import httpStatus from "http-status";

import mongoose from "mongoose";
// const { sendResponse, AppError } = require("./helpers/utils.js");

const app: express.Application = express();
const PORT: Number = 8000;
const MONGODB_URI: string =
  "mongodb+srv://phuktvn0:Qq123213@phuktvn0.xwgmvjg.mongodb.net/coder_car";

// // connect to mongoose
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log(`DB connected ${MONGODB_URI}`))
  .catch((err) => console.log(err));

// Handling GET / Request
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("Welcome to typescript backend!");
});

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
app.use("/cars", carRouter);
//customize express error handling middleware
app.use(
  (
    err: createError.HttpError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res
      .status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
);

// Server setup
app.listen(PORT, () => {
  console.log(
    "The application is listening " + "on port http://localhost:" + PORT
  );
});
