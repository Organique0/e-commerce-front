import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { categories, sort, phrase, ...filters } = req.query;

  let [sortField, sortOrder] = (sort || "_id-desc").split("-");

  let query = {};
  if (categories) {
    query.category = categories.split(",");
  }
  if (phrase) {
    query["$or"] = [
      { title: { $regex: phrase, $options: "i" } },
      { description: { $regex: phrase } }
    ];
  }

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
