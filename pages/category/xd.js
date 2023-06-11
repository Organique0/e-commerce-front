import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import Header from "@/components/Header";
import { Title } from "@/components/Title";
import Center from "@/components/Center";
import { Product } from "@/models/product";
import ProductsGrid from "@/components/ProductsGrid";
export default function CatPage({ category, products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>{category.name}</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const category = await Category.findById(context.query.id);
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
