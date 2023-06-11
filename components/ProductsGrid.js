import ProductBox from "./ProductBox";
import styled from "@emotion/styled";
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-top: 20px;
  @media screen and (max-width: 586px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default function ProductsGrid({ products, type, url, name }) {
  console.log(type);
  if (type === "category") {
    return (
      <ProductGrid>
        {products?.length > 0 &&
          products.map((product, key) => <ProductBox {...product} key={key} />)}
        <ProductBox type="category" url={url} name={name} />
      </ProductGrid>
    );
  } else {
    return (
      <ProductGrid>
        {products?.length > 0 &&
          products.map((product, key) => <ProductBox {...product} key={key} />)}
      </ProductGrid>
    );
  }
}
