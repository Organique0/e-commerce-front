import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/review";

export default async function handle(req, res, next) {
  await mongooseConnect();
  if (req.method === "POST") {
    const { title, text, stars, product } = req.body;
    console.log(stars);
    res.json(await Review.create({ title, text, stars, product }));
  }
  if (req.method === "GET") {
    const { product } = req.query;
    res.json(await Review.find({ product }, null, { sort: { createdAt: -1 } }));
  }
}
