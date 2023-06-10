import ProductBox from "./ProductBox";
import styled from "@emotion/styled";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-top: 20px;
`;

export default function ProductsGrid({ products }) {
  return (
    <ProductGrid>
      {products?.length > 0 &&
        products.map((product, key) => <ProductBox {...product} key={key} />)}
    </ProductGrid>
  );
}
