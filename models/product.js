const { Schema, model, models, default: mongoose } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      sparse: true
    }
  },
  {
    timestamps: true
  }
);

export const Product = models?.Product || model("Product", ProductSchema);
