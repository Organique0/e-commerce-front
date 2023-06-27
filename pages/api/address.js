import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Address } from "@/models/address";

export default async function handle(req, res) {
  await mongooseConnect();
  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    if (session && session.user) {
      const address = await Address.findOne({
        accountEmail: session.user.email
      });
      if (address) {
        res.json(await Address.findByIdAndUpdate(address._id, req.body));
      } else {
        res.json(
          await Address.create({
            accountEmail: session.user.email,
            ...req.body
          })
        );
      }
    } else {
      res.json(null);
    }
  }
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (session && session.user) {
      const address = await Address.findOne({
        accountEmail: session.user.email
      });
      res.json(address);
    } else {
      res.json(null);
    }
  }
}
