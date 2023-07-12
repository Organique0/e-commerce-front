import { mongooseConnect } from "@/lib/mongoose";
import { Setting } from "@/models/setting";

export default async function handle(req, res) {
  await mongooseConnect();
  if (req.method === "GET") {
    const { name } = req.query;
    res.json(await Setting.findOne({ name: name }));
  }
}
