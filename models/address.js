import mongoose, { model, models, Schema } from "mongoose";

const AddressSchema = new Schema({
  accountEmail: { type: "string", unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  streetAddress: { type: String, required: true },
  country: { type: String, required: true }
});

export const Address = models?.Address || model("Address", AddressSchema);
