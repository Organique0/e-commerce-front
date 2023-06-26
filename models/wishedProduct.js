import { Product } from "@/models/product";

const { Schema, model, models, default: mongoose } = require("mongoose");

const wishedProductSchema = new Schema({
  userEmail: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: Product }
});

export const WishedProduct =
  models?.WishedProduct || model("WishedProduct", wishedProductSchema);
