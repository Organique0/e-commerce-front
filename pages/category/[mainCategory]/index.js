import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import Header from "@/components/Header";
import { Title } from "@/components/Title";
import Center from "@/components/Center";
import { Product } from "@/models/product";
import ProductsGrid from "@/components/ProductsGrid";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  margin-left: 20px;
`;
const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  select {
    background: transparent;
    border: none;
    font-size: inherit;
    color: #444;
  }
  span {
    font-weight: 500;
  }
`;
export default function mainCategoryPage({
  category,
  products,
  subCategories
}) {
  const router = useRouter();
  const { mainCategory } = router.query;

  const [filters, setFilters] = useState(
    category.properties.map((prop) => ({ name: prop.name, value: "all" }))
  );

  const filtersRef = useRef(filters); // Create a ref to store the previous filters value

  useEffect(() => {
    filtersRef.current = filters; // Update the ref whenever filters change
  }, [filters]);

  useEffect(() => {
    const catIds = [category._id, ...(subCategories.map((c) => c._id) || [])];

    const params = new URLSearchParams();
    params.set("categories", catIds.join(","));

    filters.forEach((element) => {
      if (element.value !== "all") {
        params.set(element.name, element.value);
      }
    });
    const url = `/api/products?` + params.toString();
    console.log(url);
    axios.get(url).then((response) => {
      // Update filters only if the current filters value is different from the previous one
      if (JSON.stringify(filtersRef.current) !== JSON.stringify(filters)) {
        setFilters(response.data);
      }
    });
  }, [filters, category, subCategories]);

  const handleFilterChange = (filterName, filterValue) => {
    const updatedFilters = filters.map((filter) =>
      filter.name === filterName ? { ...filter, value: filterValue } : filter
    );
    setFilters(updatedFilters);
  };

  console.log(filters);

  return (
    <>
      <Header />
      <Center>
        <CategoryHeader>
          <Title>{mainCategory}</Title>
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
                  <option key={`${prop._id}-${index}-null`} value="all" />
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
  console.log(category);
  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products))
    }
  };
}
