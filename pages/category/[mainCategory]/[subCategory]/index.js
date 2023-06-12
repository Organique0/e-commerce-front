import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import Header from "@/components/Header";
import { Title } from "@/components/Title";
import Center from "@/components/Center";
import { Product } from "@/models/product";
import ProductsGrid from "@/components/ProductsGrid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  CategoryHeader,
  FiltersWrapper,
  Filter
} from "@/components/FiltersStyles";

export default function SubcategoryPage({ products, category }) {
  const router = useRouter();
  const { subCategory } = router.query;
  const [filters, setFilters] = useState(
    category.properties.map((prop) => ({ name: prop.name, value: "all" }))
  );

  const [CurrentProuducts, setCurrentProuducts] = useState(products);

  useEffect(() => {
    const catId = category._id || [];

    const params = new URLSearchParams();
    params.set("categories", catId);

    filters.forEach((element) => {
      if (element.value !== "all") {
        params.set(element.name, element.value);
      }
    });
    const url = `/api/products?` + params.toString();
    axios.get(url).then((response) => {
      setCurrentProuducts(response.data);
    });
  }, [filters]);
  const handleFilterChange = (filterName, filterValue) => {
    const updatedFilters = filters.map((filter) =>
      filter.name === filterName ? { ...filter, value: filterValue } : filter
    );
    setFilters(updatedFilters);
  };
  return (
    <>
      <Header />
      <Center>
        <CategoryHeader>
          <Title>{subCategory}</Title>
          <FiltersWrapper>
            {category.properties.map((prop, index) => (
              <Filter key={`${prop._id}-${index}`}>
                <span>{prop.name}:</span>
                <select
                  onChange={(e) => {
                    handleFilterChange(prop.name, e.target.value); // Use e.target.value to get the selected value
                  }}
                  value={filters.find((f) => f.name === prop.name)?.value || ""} // Access the value property
                >
                  <option key={`${prop._id}-${index}-null`} value="all">
                    all
                  </option>
                  {prop.values.map((value, valueIndex) => (
                    <option
                      value={value}
                      key={`${prop._id}-${index}-${valueIndex}`}
                    >
                      {value}
                    </option>
                  ))}
                </select>
              </Filter>
            ))}
          </FiltersWrapper>
        </CategoryHeader>
        <ProductsGrid products={CurrentProuducts} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const category = await Category.findOne({
    name: context.query.subCategory
  });
  console.log(category);
  const products = await Product.find({ category: category });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      category: JSON.parse(JSON.stringify(category))
    }
  };
}
