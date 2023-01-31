"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarById = exports.updateCarById = exports.getAllCars = exports.createCar = void 0;
const Car_1 = __importDefault(require("../models/Car"));
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_1 = __importDefault(require("http-status"));
const car_validators_1 = require("./car.validators");
function createCar(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error, value } = car_validators_1.createCarQuerySchema.validate(req.body, {
                abortEarly: false,
            });
            if (error) {
                throw (0, http_errors_1.default)(http_status_1.default.BAD_REQUEST, error.message);
            }
            const created = yield Car_1.default.create(value);
            const responseData = {
                data: {
                    message: "Create Car Successfully!",
                    car: created,
                },
            };
            res.status(200).send(responseData);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.createCar = createCar;
function getAllCars(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error, value } = car_validators_1.getAllCarsQuerySchema.validate(req.query, {
                abortEarly: false,
            });
            if (error) {
                throw (0, http_errors_1.default)(http_status_1.default.BAD_REQUEST, error.message);
            }
            const { page, limit } = value, filterValue = __rest(value, ["page", "limit"]);
            let totalPages = 0;
            let listOfCars = [];
            listOfCars = yield Car_1.default.find(filterValue);
            if (listOfCars.length === 0) {
                throw (0, http_errors_1.default)(http_status_1.default.NOT_FOUND, "Car not found!");
            }
            totalPages = Math.ceil(listOfCars.length / limit);
            const offset = limit * (page - 1);
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
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getAllCars = getAllCars;
function updateCarById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { error, value } = car_validators_1.createCarQuerySchema.validate(req.body, {
                abortEarly: false,
            });
            if (error) {
                throw (0, http_errors_1.default)(http_status_1.default.BAD_REQUEST, error.message);
            }
            const findCar = yield Car_1.default.findById(id);
            if (!findCar) {
                throw (0, http_errors_1.default)(http_status_1.default.NOT_FOUND, "Car not found!");
            }
            else {
                const updated = yield Car_1.default.findByIdAndUpdate(id, value, {
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
        }
        catch (err) {
            next(err);
        }
    });
}
exports.updateCarById = updateCarById;
function deleteCarById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error, value } = car_validators_1.carIdParamSchema.validate(req.params);
            if (error) {
                throw (0, http_errors_1.default)(http_status_1.default.BAD_REQUEST, error.message);
            }
            const { id } = value;
            const findCar = yield Car_1.default.findById(id);
            if (!findCar) {
                throw (0, http_errors_1.default)(http_status_1.default.NOT_FOUND, "Car not exists!");
            }
            const target = yield Car_1.default.findByIdAndDelete(id, { new: true });
            const responseData = {
                data: {
                    message: "Delete Car Successfully!",
                    car: target,
                },
            };
            res.status(200).send(responseData);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.deleteCarById = deleteCarById;
