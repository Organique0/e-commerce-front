import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Address } from "@/models/address";

export default async function handle(req, res) {
  await mongooseConnect();
  if (req.method === "PUT") {
    const { user } = await getServerSession(req, res, authOptions);
    const address = await Address.findOne({ accountEmail: user.email });
    if (address) {
      res.json(await Address.findByIdAndUpdate(address._id, req.body));
    } else {
      res.json(await Address.create({ accountEmail: user.email, ...req.body }));
    }
  }
  if (req.method == "GET") {
    const { user } = await getServerSession(req, res, authOptions);
    const address = await Address.findOne({ accountEmail: user.email });
    res.json(address);
  }
}
