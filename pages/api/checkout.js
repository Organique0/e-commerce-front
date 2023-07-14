import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";
import { Product } from "@/models/product";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Setting } from "@/models/setting";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method == "POST") {

  
  const {
    name,
    email,
    city,
    postalCode,
    country,
    streetAddress,
    cartProducts
  } = req.body;
  await mongooseConnect();
  const productIds = cartProducts;
  const uniqueIds = [...new Set(productIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const info = productsInfos.find((p) => p._id.toString() === productId);
    const quantity = productIds.filter((id) => id === productId).length;
    if (quantity > 0 && info) {
      line_items.push({
        quantity,
        price_data: {
          currency: "EUR",
          product_data: { name: info.title },
          unit_amount: quantity * info.price * 100
        }
      });
    }
  }
  const session = await getServerSession(req, res, authOptions);

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
    userEmail: session?.user?.email
  });

  const shippingFee = await Setting.findOne({ name: "shippingFee" });
  const shippingFeeInCents = parseInt(shippingFee.value || "0") * 100;

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=true",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=true",
    metadata: { orderId: orderDoc._id.toString() },
    allow_promotion_codes:true,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "shipping fee",
          type: "fixed_amount",
          fixed_amount: { amount: shippingFeeInCents, currency: "EUR" }
        }
      }
    ]
  });

  res.json({
    url: stripeSession.url
  });
}}
