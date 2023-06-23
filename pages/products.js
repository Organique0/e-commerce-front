import Center from "@/components/Center";
import Header from "@/components/Header";
import { Title } from "@/components/Title";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { WishedProduct } from "@/models/wishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function productsPage({ products, wishedAllProducts }) {
  return (
    <>
      <Header />
      <Center>
        <Title>all products</Title>
        <ProductsGrid products={products} wishedProducts={wishedAllProducts} />
      </Center>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const { user } = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedAllProducts = await WishedProduct.find({
    userEmail: user.email,
    product: products.map((p) => p._id.toString())
  });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedAllProducts: wishedAllProducts.map((i) => i.product.toString())
    }
  };
}
