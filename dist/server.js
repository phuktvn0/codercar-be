"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const car_api_1 = __importDefault(require("./routers/car.api"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = 8000;
const MONGODB_URI = process.env.MONGO_URI ||
    "mongodb+srv://phuktvn0:Qq123213@phuktvn0.xwgmvjg.mongodb.net/coder_car";
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => console.log(`DB connected ${MONGODB_URI}`))
    .catch((err) => console.log(err));
app.get("/", (req, res) => {
    res.status(200).send("Welcome to typescript backend!");
});
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/cars", car_api_1.default);
app.use((err, req, res, next) => {
    res
        .status(err.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
});
app.listen(PORT, () => {
    console.log("The application is listening " + "on port http://localhost:" + PORT);
});
