import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import Header from "@/components/Header";
import { Title } from "@/components/Title";
import Center from "@/components/Center";
import { Product } from "@/models/product";
import ProductsGrid from "@/components/ProductsGrid";
import { useRouter } from "next/router";

export default function mainCategoryPage({ category, products }) {
  const router = useRouter();
  const { mainCategory } = router.query;
  return (
    <>
      <Header />
      <Center>
        <Title>{mainCategory}</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const category = await Category.findOne({
    name: context.query.mainCategory
  });
  const subCategories = await Category.find({ parent: category._id });
  const catIds = subCategories.map((c) => c._id);
  const products = await Product.find({ category: { $in: catIds } });
  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(products))
    }
  };
}
