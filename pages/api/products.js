import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { categories, ...filters } = req.query;
  const query = { category: categories.split(",") };

  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((filterName) => {
      query["properties." + filterName] = filters[filterName];
    });
  }
  res.json(await Product.find(query));
}
