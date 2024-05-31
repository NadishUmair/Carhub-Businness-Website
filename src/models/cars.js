import mongoose from "mongoose";

const carsSchema = new mongoose.Schema({
  make: { type: String },
  model: { type: String },
  touring: { type: String },
  zippostal: { type: Number },
  distance: { type: Number },
  price: { type: Number },
  year: { type: Number },
  millage: { type: Number },
  cartype: { type: String },
  fueltype: { type: String },
  transmission: { type: String },
  saletype: { type: String },
  bodystyle: { type: String },
  drivetype: { type: String },
  exteriorcolor: { type: String },
  location: { type: String },
  interiorcolor: { type: String },
  doors: { type: Number },
  cylinder: { type: Number },
  title: { type: String },
  forsaleby: { type: String },
  keywords: { type: String },
  lastdays: { type: Number },
  dealername: { type: String },
  carImg: { type: String },
  description: { type: String }
}, {
  timestamps: true
});

const carsModel = mongoose.models.cars || mongoose.model("cars", carsSchema);

export default carsModel;
