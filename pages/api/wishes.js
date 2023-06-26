import { mongooseConnect } from "@/lib/mongoose";
import { WishedProduct } from "@/models/wishedProduct";
import { Product } from "@/models/product";

export const fetchDbData = async () => {
  await mongooseConnect();
  const products = await Product.find();
  const wishedAllProducts = await WishedProduct.find({
    userEmail: "grabnar.luka@gmail.com",
    product: products.map((p) => p._id.toString())
  });
  return JSON.parse(
    JSON.stringify(wishedAllProducts.map((i) => i.product.toString()))
  );
};

export default async (req, res) => {
  const data = await fetchDbData();
  res.status(200).json(data);
};
