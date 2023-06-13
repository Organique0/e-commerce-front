import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { categories, sort, ...filters } = req.query;
  const query = { category: categories.split(",") };
  const [sortField, sortOrder] = sort.split("-");

  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((filterName) => {
      query["properties." + filterName] = filters[filterName];
    });
  }
  res.json(
    await Product.find(query, null, {
      sort: { [sortField]: sortOrder === "asc" ? 1 : -1 }
    })
  );
}
