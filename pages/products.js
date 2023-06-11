import Center from "@/components/Center";
import Header from "@/components/Header";
import {Title} from "@/components/Title";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default function productsPage({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>all products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  };
}
