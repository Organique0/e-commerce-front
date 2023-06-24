import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { WishedProduct } from "@/models/wishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function HomePage({
  featuredProduct,
  newProducts,
}) {
  
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const featuredProductId = "6485c6f320621b2782c948a9";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10
  });
  const { user } = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedNewProducts = await WishedProduct.find({
    userEmail: user.email,
    product: newProducts.map((p) => p._id.toString())
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((i) => i.product.toString())
    }
  };
}
