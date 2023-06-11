import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { Category } from "@/models/category";
import Header from "@/components/Header";
import Center from "@/components/Center";
import { CatTitle } from "@/components/Title";
import ProductsGrid from "@/components/ProductsGrid";
import styled from "@emotion/styled";
import Link from "next/link";

const TitleAndShowAll = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  a {
    color: #888;
    text-decoration: none;
  }
`;

export default function AllCatPage({
  MainCategories,
  SubCategories,
  SubCategories3Products
}) {
  return (
    <>
      <Header />
      <Center>
        {MainCategories.map((mainCategory) => (
          <div key={mainCategory._id}>
            <TitleAndShowAll>
              <CatTitle>{mainCategory.name}</CatTitle>
              <div>
                <Link href={"/category/" + mainCategory._id}>show all</Link>
              </div>
            </TitleAndShowAll>

            {SubCategories.map((subCategory) => {
              if (subCategory.parent === mainCategory._id) {
                const products = SubCategories3Products[subCategory._id];
                return (
                  <div key={subCategory._id}>
                    <h3>{subCategory.name}</h3>
                    <ProductsGrid
                      products={products}
                      type="category"
                      url={"/category/" + subCategory._id}
                      name={subCategory.name}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find();
  const MainCategories = categories.filter((c) => !c.parent);
  const SubCategories = categories.filter((c) => c.parent);

  const SubCategories3Products = {};
  for (const subCat of SubCategories) {
    const products = await Product.find({ category: subCat._id }, null, {
      limit: 3,
      sort: { _id: -1 }
    });
    SubCategories3Products[subCat._id] = products;
  }

  return {
    props: {
      MainCategories: JSON.parse(JSON.stringify(MainCategories)),
      SubCategories: JSON.parse(JSON.stringify(SubCategories)),
      SubCategories3Products: JSON.parse(JSON.stringify(SubCategories3Products))
    }
  };
}
