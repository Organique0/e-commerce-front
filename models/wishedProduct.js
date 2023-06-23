const { Schema, model, models, default: mongoose } = require("mongoose");

const wishedProductSchema = new Schema({
  userEmail: { type: String, required: true },
  product: { type: Schema.Types.ObjectId }
});

export const WishedProduct =
  models?.WishedProduct || model("WishedProduct", wishedProductSchema);
