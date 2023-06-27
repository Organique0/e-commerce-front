import { mongooseConnect } from "@/lib/mongoose";
import { WishedProduct } from "@/models/wishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  await mongooseConnect();
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    if (session && session.user) {
      const { product } = req.body;
      const wishedDoc = await WishedProduct.findOne({
        userEmail: session.user.email,
        product
      });
      if (wishedDoc) {
        await WishedProduct.findByIdAndDelete(wishedDoc._id);
        res.json("wish deleted");
      } else {
        await WishedProduct.create({ userEmail: session.user.email, product });
        res.json("wish created");
      }
    } else {
      res.json(null);
    }
  }

  if (req.method == "GET") {
    if (session && session.user) {
      res.json(
        await WishedProduct.find({ userEmail: session.user.email })
          .populate("product")
          .exec()
      );
    } else {
      res.json(null);
    }
  }
}
