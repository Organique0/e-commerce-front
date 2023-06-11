import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { categories, ...filters } = req.query;
  res.json(
    await Product.find({ category: categories.split(","), properties: filters })
  );
}
