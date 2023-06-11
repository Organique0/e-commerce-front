import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import Header from "@/components/Header";
import { Title } from "@/components/Title";
import Center from "@/components/Center";
import { Product } from "@/models/product";
import ProductsGrid from "@/components/ProductsGrid";
import { useRouter } from "next/router";

export default function SubcategoryPage({ products }) {
  const router = useRouter();
  const { subCategory } = router.query;

  return (
    <>
      <Header />
      <Center>
        <Title>{subCategory}</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const category = await Category.find({
    name: context.query.subCategory
  });
  const products = await Product.find({ category: category });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  };
}
