import { Schema, model } from "mongoose";

interface data {
  make: string;
  year: number;
  transmission_type: string;
  size: string;
  style: string;
  price: number;
}

//Create schema
const carSchema = new Schema<data>(
  {
    make: { type: String, required: true },
    year: { type: Number, required: true },
    transmission_type: { type: String, required: true },
    size: { type: String, required: true },
    style: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Car = model<data>("Car", carSchema);

export default Car;
